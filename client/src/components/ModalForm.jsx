import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconTextField from './IconTextField';
import { Button, ButtonGroup, colors } from '@mui/material';
import Api from '../services/Api.interceptor';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { changeFormRole } from '../redux/slices/FormRoleSlice';

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

export default function ModalForm(props) {
    const dispatch = useDispatch()
    const { itemValue, setItemValue, rowValue, isModalOpen, setIsModalOpen, itemView, dataUpdated, setDataUpdated } = props

    const onModalClose = () => {
        setIsModalOpen(false)
        dispatch(changeFormRole(false))
    }
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const formWillUpdate = useSelector(state => state.formRole.formWillUpdate)

    const handleUpdateExisting = async (ev) => {
        try {
            ev.preventDefault()
            if(itemValue){
                const res = await Api.post('/updateitem', {
                    name: rowValue,
                    newname: itemValue
                })
                if (res.status === 200) {
                    setIsModalOpen(!isModalOpen)
                    setItemValue('')
                    setDataUpdated(!dataUpdated)
                    dispatch(changeFormRole(false))
                }
            } else {
                const res = await Api.post('/updateuser', {
                    name: rowValue,
                    newname: nameValue,
                    newemail: emailValue
                })
                if (res.status === 200) {
                    setIsModalOpen(!isModalOpen)
                    setNameValue('')
                    setEmailValue('')
                    setDataUpdated(!dataUpdated)
                    dispatch(changeFormRole(false))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewSubmit = async (ev) => {
        try {
            ev.preventDefault()
            const createdBy = Cookies.get('userName')
            if (itemView) {
                const response = await Api.post('/createitem', {
                    name: itemValue,
                    created_by: createdBy
                }, {
                    headers: {
                        "x-user-role": 'admin'
                    }
                })
                if (response.status === 200) {
                    setDataUpdated(!dataUpdated)
                    setItemValue('')
                    setIsModalOpen(false)
                }
            } else {
                const response = await Api.post('/createuser', {
                    name: nameValue,
                    email: emailValue,
                    password: passValue,
                    created_by: createdBy
                })
                if (response.status === 200) {
                    setDataUpdated(!dataUpdated)
                    setEmailValue('')
                    setNameValue('')
                    setPassValue('')
                    setIsModalOpen(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={onModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {formWillUpdate ?
                            <h3 style={{ color: colors.grey[800] }}>
                                {itemView ? 'Update Item' : 'Update User'}
                            </h3>
                            :
                            <h3 style={{ color: colors.grey[800] }}>
                                {itemView ? 'Add Item' : 'Add User'}
                            </h3>
                        }
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
                                    </div>
                                }
                            </Typography>
                            <ButtonGroup fullWidth sx={{ display: 'flex', gap: 0.3, mt: 3 }}>
                                {formWillUpdate ?
                                    <Button size='medium'
                                        type='submit'
                                        onClick={(ev) => handleUpdateExisting(ev)}
                                        sx={{ background: colors.grey[800] }} variant='contained'>
                                        {itemView ? 'Update Item' : 'Update User'}
                                    </Button>
                                    :
                                    <Button size='medium'
                                        type='submit'
                                        onClick={(ev) => handleNewSubmit(ev)}
                                        sx={{ background: colors.grey[800] }} variant='contained'>
                                        {itemView ? 'Add Item' : 'Add User'}
                                    </Button>
                                }
                                <Button size='medium'
                                    onClick={onModalClose}
                                    sx={{ background: colors.grey[800] }} variant='contained'>Cancel</Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
