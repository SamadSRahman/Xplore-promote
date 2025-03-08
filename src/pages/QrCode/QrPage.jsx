/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */

import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./QrCode.module.css";
import logo from "../../assets/xplr.svg";
import qrLogo from '../../assets/xplore-logo.svg'

const QRLogin = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [qrData, setQRData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let API_BASE_URL = "https://xplr.live/api";
  if (window.location.origin === "https://pre.xplore.xircular.io") {
    API_BASE_URL = "https://pre.xplore.xircular.io/api";
  }
  // API_BASE_URL = 'https://xplr.live/api';

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/home");
    }
    // Initialize socket connection
    const socketInstance = io(
      window.location.origin.includes("pre.xplore")
        ? "https://pre.xplore.xircular.io"
        : "https://xplr.live",
      {
        path: "/socket.io/",
        transports: ["websocket"], // Start with polling
      }
    );

    socketInstance.on("connect", () => {
      console.log("Socket connected with ID:", socketInstance.id);
      generateQRCode(socketInstance);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setError("Failed to connect to server. Please check your connection.");
    });

    // Set up login event listener outside of generateQRCode
    socketInstance.on("login-event", (data) => {
      console.log("Login event received:", data);
      handleLoginEvent(data);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        console.log("Cleaning up socket connection");
        socketInstance.off("login-event");
        socketInstance.disconnect();
      }
    };
  }, []); // Empty dependency array

  const generateQRCode = async (socketInstance) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_BASE_URL}/v1/qr/generate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true
        }
      );

      if (!response.data?.data) {
        throw new Error("Invalid response from server");
      }

      const { channel, expiresIn, token } = response.data.data;
      setQRData(response.data.data);
      localStorage.setItem("channel", channel);

      // Explicitly join the channel
      if (socketInstance && socketInstance.connected) {
        console.log("Joining channel:", channel);
        socketInstance.emit("join-qr-channel", channel);
      }

      // Set up refresh timer
      const refreshTimeout = Math.max(0, expiresIn - 10000);
      return () =>
        setTimeout(() => generateQRCode(socketInstance), refreshTimeout);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      setError(
        error.response?.data?.message ||
          "Failed to generate QR code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginEvent = async (data) => {
    try {
      const { token, userId, accessToken } = data;

      if (!token || !userId) {
        throw new Error("Invalid login data received");
      }
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("socketToken", token);
      navigate("/home");
      console.log("Processing login event with data:", { token, userId });
    } catch (error) {
      console.error("Login verification error:", error);
      setError("Failed to verify login. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.body}>
          <h5 className={styles.heading}>
            Follow below steps to login to Xplore tool{" "}
          </h5>
          <div className={styles.contentSection}>
            <div className={styles.steps}>
              <h6>Steps to follow</h6>
              <p>1. Go the the Profile Section and click on Linked devices in your mobile app</p>
              <p>2. Point your mobile camera towards the Qr given right side</p>
              <p>3. You scan start editing once the campaign editor opens</p>
            </div>
            <div className={styles.qrContainer}>
              <QRCodeCanvas
                value={qrData ? `${qrData.channel}@1O4e2Ob${qrData.token}` : ""}
                size={140}
                level="H"
              />
              <img
                src={qrLogo} // Replace with your image path
                className={styles.qrLogo}
                alt="QR Code Logo"
              />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <strong>New to platform? Click below to get in touch with us</strong>
            <div className={styles.btnContainer}>
            <button className={styles.contactUsBtn} onClick={()=>navigate("/contactUs")}>Contact Us</button>
            <button className={styles.knowMoreBtn}
            onClick={()=>window.location.href="https://xplr.live/tnslpvfpp"

            }
            >Know more about us</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QRLogin;
