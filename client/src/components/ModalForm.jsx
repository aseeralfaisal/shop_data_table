import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconTextField from './IconTextField';
import { Button, ButtonGroup, colors } from '@mui/material';
import Api from '../services/Api.interceptor';
import Cookies from 'js-cookie';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalForm({ isModalOpen, setIsModalOpen, itemView, dataUpdated, setDataUpdated }) {

    const handleClose = () => setIsModalOpen(false)
    const [itemValue, setItemValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')

    const handleSubmission = async (ev) => {
        try {
            ev.preventDefault()
            const createdBy = Cookies.get('userName')
            console.log({ createdBy })
            if (itemView) {
                const response = await Api.post('/createitem', {
                    name: itemValue,
                    created_by: createdBy
                })
                if (response.status === 200) {
                    setDataUpdated(!dataUpdated)
                    setIsModalOpen(false)
                }
            } else {
                const response = await Api.post('/createuser', {
                    name: nameValue,
                    email: emailValue,
                    password: passValue,
                    created_by: createdBy
                })
                console.log(response.data)
                if (response.status === 200) {
                    setDataUpdated(!dataUpdated)
                    setIsModalOpen(false)
                }
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'grid', gap: 10 }}>
                        <h3 style={{ color: colors.grey[800] }}>
                            {itemView ? 'Add Item' : 'Add User'}
                        </h3>
                        <form>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {itemView ?
                                    <IconTextField label="Item"
                                        value={itemValue} setValue={setItemValue} type='text' width="100%" />
                                    :
                                    <div style={{ display: 'grid', gap: 10 }}>
                                        <IconTextField label="Email"
                                            value={emailValue} setValue={setEmailValue} type='email' width="100%" />
                                        <IconTextField label="Name"
                                            value={nameValue} setValue={setNameValue} type='text' width="100%" />
                                        <IconTextField label="Password"
                                            value={passValue} setValue={setPassValue} type='password' width="100%" />
                                    </div>
                                }
                            </Typography>
                            <ButtonGroup fullWidth sx={{ display: 'flex', gap: 0.3 }}>
                                <Button size='medium'
                                    type='submit'
                                    onClick={(ev) => handleSubmission(ev)}
                                    sx={{ background: colors.grey[800] }} variant='contained'>
                                    {itemView ? 'Add Item' : 'Add User'}
                                </Button>
                                <Button size='medium'
                                    onClick={handleClose}
                                    sx={{ background: colors.grey[800] }} variant='contained'>Cancel</Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
