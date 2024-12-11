/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */

import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './QrCode.module.css';
import logo from '../../assets/xplore_white.svg';


const QRLogin = () => {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [qrData, setQRData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/campaigns');
        }
        // Initialize socket connection
        const socketInstance = io("https://xplr.live", {
            path: '/socket.io/',
            transports: ['websocket'], // Start with polling

        });

        socketInstance.on('connect', () => {
            console.log('Socket connected with ID:', socketInstance.id);
            generateQRCode(socketInstance);
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setError('Failed to connect to server. Please check your connection.');
        });

        // Set up login event listener outside of generateQRCode
        socketInstance.on("login-event", (data) => {
            console.log('Login event received:', data);
            handleLoginEvent(data);
        });

        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                console.log('Cleaning up socket connection');
                // socketInstance.off('login-event');
                // socketInstance.disconnect();
            }
        };
    }, []); // Empty dependency array

    const generateQRCode = async(socketInstance) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API_BASE_URL}/v1/qr/generate`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                // withCredentials: true
            });

            if (!response.data?.data) {
                throw new Error('Invalid response from server');
            }

            const { channel, expiresIn, token } = response.data.data;
            setQRData(response.data.data);
            localStorage.setItem('channel', channel);

            // Explicitly join the channel
            if (socketInstance && socketInstance.connected) {
                console.log('Joining channel:', channel);
                socketInstance.emit('join-qr-channel', channel);
            }

            // Set up refresh timer
            const refreshTimeout = Math.max(0, expiresIn - 10000);
            return () => setTimeout(() => generateQRCode(socketInstance), refreshTimeout);
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            setError(error.response?.data?.message || 'Failed to generate QR code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginEvent = async (data) => {
        try {
            const { token, userId, accessToken } = data;

            if (!token || !userId) {
                throw new Error('Invalid login data received');
            }
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('socketToken', token);
            navigate('/campaigns');
            console.log('Processing login event with data:', { token, userId });
        } catch (error) {
            console.error('Login verification error:', error);
            setError('Failed to verify login. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={styles.body}>
                    <div className={styles.leftSection}>
                        <h4>Follow the steps</h4>
                        <span>1. Click on create campaign in your mobile app</span>
                        <span>2. Point your mobile camera towards the QR code on the right</span>
                        <span>3. You can start editing once the campaign editor opens</span>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.qrWrapper}>
                            {loading ? (
                                <div>Loading QR Code...</div>
                            ) : error ? (
                                <div>
                                    <p>{error}</p>
                                    <button onClick={() => generateQRCode(socket)}>Retry</button>
                                </div>
                            ) : (
                                <QRCodeCanvas
                                    value={qrData ? `${qrData.channel}@1O4e2Ob${qrData.token}` : ''}
                                    size={150}
                                    level="H"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRLogin;
