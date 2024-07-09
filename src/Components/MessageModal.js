import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './MessageModal.css';

const MessageModal = ({ isOpen, toggleModal }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            'http://localhost:5000/api/messages/unread',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (response.data.status === 'success' && response.data.data) {
            const fetchedMessages = response.data.data.unreadMessages || [];
            setMessages(fetchedMessages);

            if (fetchedMessages.length > 0) {
              setModalTitle('Unread Messages');
            } else {
              setModalTitle('No messages available');
            }

            console.log('Fetched messages:', fetchedMessages);

            fetchedMessages.forEach((message) => {
              console.log('Message content:', message.content);
            });
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log('Messages state updated:', messages);
  }, [messages]);

  useEffect(() => {
    console.log('Loading state updated:', loading);
  }, [loading]);

  const markMessagesAsRead = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/messages/mark-read',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Messages marked as read.');
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const handleCloseModal = () => {
    toggleModal();
    markMessagesAsRead();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="message-modal">
      <div className="modal-content">
        <h2 className="title">{modalTitle}</h2>
        <FontAwesomeIcon
          icon={faTimes}
          className="clear-icon"
          onClick={handleCloseModal}
        />
        <div className="messages-list">
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            messages.map((message) => {
              console.log('Rendering message:', message); // Add log here
              return (
                <div key={message._id} className="message-item">
                  <p className="content">{message.content}</p>
                  <span>{new Date(message.sentAt).toLocaleString()}</span>
                  <span>{new Date(message.createdAt).toLocaleString()}</span>
                </div>
              );
            })
          ) : (
            <p className="content">No messages available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
