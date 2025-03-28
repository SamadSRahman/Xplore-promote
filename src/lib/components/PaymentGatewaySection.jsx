import React, { useState, useEffect } from 'react';
import styles from './WhatsAppSection/WhatsAppSection.module.css';
import AddPaymentGatewayPopup from './AddPaymentGatewayPopup';
import { usePaymentGateway } from '../utils/usePaymentGateway';
import TableComponent from './TableComponent/TableComponent';

const PaymentGatewaySection = () => {
  const [configs, setConfigs] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const { getAllConfigs, createConfig, updateConfig } = usePaymentGateway();

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const response = await getAllConfigs();
      setConfigs(response.data.configurations);
    } catch (error) {
      console.error('Error loading payment configs:', error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await createConfig(data);
      loadConfigs();
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error creating payment config:', error);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateConfig(selectedConfig.id, data);
      loadConfigs();
      setShowEditPopup(false);
      setSelectedConfig(null);
    } catch (error) {
      console.error('Error updating payment config:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h6>Payment Gateway</h6>
        <button 
          className={styles.addNewBtn}
          onClick={() => setShowAddPopup(true)}
        >
          Add New
        </button>
      </header>

      <TableComponent
        headers={["Name", "Provider", "Client ID", "Redirect URL", "Actions"]}
        data={configs}
        renderRow={(item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            <td>{item.name}</td>
            <td>{item.provider || "-"}</td>
            <td>{item.XClientId || "-"}</td>
            <td>{item.redirection_url || "-"}</td>
            <td className={styles.btnWrapper}>
              <button
                onClick={() => {
                  setSelectedConfig(item);
                  setShowEditPopup(true);
                }}
                className={styles.addKeyBtn}
              >
                Edit
              </button>
            </td>
          </tr>
        )}
      />

      {showAddPopup && (
        <AddPaymentGatewayPopup
          onClose={() => setShowAddPopup(false)}
          onSubmit={handleAdd}
        />
      )}

      {showEditPopup && selectedConfig && (
        <AddPaymentGatewayPopup
          onClose={() => {
            setShowEditPopup(false);
            setSelectedConfig(null);
          }}
          onSubmit={handleEdit}
          initialData={selectedConfig}
        />
      )}
    </div>
  );
};

export default PaymentGatewaySection; 