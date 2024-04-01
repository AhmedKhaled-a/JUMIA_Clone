import React, { useEffect, useState } from 'react';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Container } from '@mui/material';
import TopSelling from '../Components/Account/TopSelling';
import { userDataSelector } from '../userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const drawerWidth = 240;


export default function Inbox() {
    const { user } = useSelector(userDataSelector);
    const [messages, setMessages] = useState([]);
    const userId = user.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/messages`);
                const filteredMessages = response.data.filter(message => message.user_id === userId);
                setMessages(filteredMessages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <>
        <Container style={{display: 'grid', marginBottom: '50px'}}>
            <Box sx={{ display: "flex" }}>
                <Account />
                <Box
                    component="main"
                    sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 5
                    }}
                >
                    {/* <Toolbar /> */}
                    <div class="accordion" id="accordionExample">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            

                            <div class="accordion-item" key={message.id}>
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${index}`}>
                                    <span class="badge text-bg-secondary me-2">{index+1}</span> {message.title} <small className='text-muted mt-1 ms-2'>From {message.writer}</small>
                                </button>
                            </h2>
                            <div id={`panelsStayOpen-collapse-${index}`} class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <strong>{message.content}</strong>
                                </div>
                            </div>
                        </div>
                        

                        ))
                    ) : (
                        <div>
                            <div className='d-flex justify-content-center align-items-center flex-column h-100'>      
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="#F5F5F5"/><g transform="translate(20 18.6)"><path fill="#D17511" fill-rule="nonzero" d="M58.2 25l-21 16H21L0 25"/><path fill="#FFB048" fill-rule="nonzero" d="M58.2 57H0l21-16h16.1z"/><path fill="#F90" fill-rule="nonzero" d="M21 41L0 57V25l6 4.5 4.4 3.4 2 1.4.4.4.6.4 1.2 1 .6.4 1.5 1.1.6.5.3.3 2 1.5h.2zm37.2-16v32l-21-16 1.2-1h.1l2-1.6.3-.3.7-.5 1.4-1 .7-.5 1.2-1 .6-.4.4-.4 1.5-1.1 4.8-3.6z"/><path fill="#F90" d="M0 25L26.7 1a3.5 3.5 0 014.7 0l26.8 24H0z"/><circle cx="57.9" cy="25.3" r="11.4" fill="#C9C9C9" fill-rule="nonzero" stroke="#FFF" stroke-width="2"/><path fill="#FFF" fill-rule="nonzero" d="M61.3 26c0 1.4-.3 2.5-.9 3.3-.6.8-1.5 1.1-2.6 1.2-1.1 0-2-.4-2.6-1.2-.6-.7-1-1.8-1-3.2v-2c0-1.4.4-2.5 1-3.2.6-.8 1.4-1.2 2.6-1.2 1.1 0 2 .4 2.6 1.2.6.7.9 1.8 1 3.2V26zm-2-2.1c0-.9-.2-1.5-.4-2-.2-.3-.6-.5-1.1-.5-.5 0-.9.2-1 .6-.3.3-.4 1-.5 1.7v2.6c0 .8.2 1.4.4 1.9.2.4.6.6 1.1.6.5 0 .9-.2 1-.6.3-.4.4-1 .4-1.8v-2.5z"/></g></svg>
                                <h6 className='mt-3'>You don't have any messages</h6>
                                <p className='mt-2'>Here you will be able to see all the messages that we send you. Stay tuned</p>
                            </div>
                        </div>
                    )}
                    </div>
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
        
    )
}
