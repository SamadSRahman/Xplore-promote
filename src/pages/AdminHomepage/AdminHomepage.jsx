import React, { useState } from 'react';
import styles from './AdminHomepage.module.css';
import logo from '../../assets/xplore-logo.svg'
// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.modalCloseBtn}>×</button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminHomepage = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isClientDetailsModalOpen, setIsClientDetailsModalOpen] = useState(false);
  
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddClient = () => {
    const clientToAdd = {
      id: clients.length + 1,
      ...newClient
    };
    setClients([...clients, clientToAdd]);
    setNewClient({ name: '', email: '', password: '' });
    setIsAddClientModalOpen(false);
  };

  const handleUpdateClient = () => {
    const updatedClients = clients.map(client => 
      client.id === selectedClient.id ? selectedClient : client
    );
    setClients(updatedClients);
    setIsClientDetailsModalOpen(false);
  };

  const handleRemoveClient = () => {
    const filteredClients = clients.filter(client => client.id !== selectedClient.id);
    setClients(filteredClients);
    setIsClientDetailsModalOpen(false);
  };

  const handleClientCardClick = (client) => {
    setSelectedClient(client);
    setIsClientDetailsModalOpen(true);
  };

  return (
    <div className={styles.adminHomepage}>
      <div className={styles.header}>
        <div className={styles.logo}>
        <img src={logo} alt="" /> Admin Panel
        </div>
        <button 
          className={styles.addClientBtn}
          onClick={() => setIsAddClientModalOpen(true)}
        >
          Add New Client
        </button>
      </div>

      <div className={styles.clientList}>
        {clients.map(client => (
          <div 
            key={client.id} 
            className={styles.clientCard}
            onClick={() => handleClientCardClick(client)}
          >
            <h3>{client.name}</h3>
            <p>{client.email}</p>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      <Modal 
        isOpen={isAddClientModalOpen} 
        onClose={() => setIsAddClientModalOpen(false)}
        title="Add New Client"
      >
        <form className={styles.clientForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input 
              type="text"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password"
              value={newClient.password}
              onChange={(e) => setNewClient({...newClient, password: e.target.value})}
            />
          </div>
          <button 
            type="button"
            className={styles.submitBtn}
            onClick={handleAddClient}
          >
            Add Client
          </button>
        </form>
      </Modal>

      {/* Client Details Modal */}
      <Modal 
        isOpen={isClientDetailsModalOpen} 
        onClose={() => setIsClientDetailsModalOpen(false)}
        title="Client Details"
      >
        {selectedClient && (
          <form className={styles.clientForm}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input 
                type="text"
                value={selectedClient.name}
                onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input 
                type="email"
                value={selectedClient.email}
                onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
              />
            </div>
            <div className={styles.clientActions}>
              <button 
                type="button"
                className={styles.updateBtn}
                onClick={handleUpdateClient}
              >
                Update
              </button>
              <button 
                type="button"
                className={styles.removeBtn}
                onClick={handleRemoveClient}
              >
                Remove Client
              </button>
              <button 
                type="button"
                className={styles.assignCampaignBtn}
              >
                Assign Campaign
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminHomepage;