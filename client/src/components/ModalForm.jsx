import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconTextField from './IconTextField';
import { Button, ButtonGroup, Grid, colors } from '@mui/material';

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

export default function ModalForm({ isModalOpen, setIsModalOpen }) {
    
    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false)

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
                            Add an Item
                        </h3>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <IconTextField label="Item" type='text' width="100%" />
                        </Typography>
                        <ButtonGroup fullWidth sx={{ display: 'flex', gap: 0.3 }}>
                            <Button size='medium'
                                sx={{ background: colors.grey[800] }} variant='contained'>Add Item</Button>
                            <Button size='medium'
                                onClick={handleClose}
                                sx={{ background: colors.grey[800] }} variant='contained'>Cancel</Button>
                        </ButtonGroup>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
