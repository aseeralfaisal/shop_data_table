import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconTextField from './IconTextField'
import { Button, ButtonGroup, colors, Typography, Modal, Box } from '@mui/material'
import Api from '../services/Api.interceptor'
import Cookies from 'js-cookie'
import { setIsFormUpdateMode } from '../redux/slice'
import { setDataUpdated } from '../redux/slice'

export default function ModalForm(props) {
    const dispatch = useDispatch()
    const { itemValue, setItemValue, rowValue, isModalOpen, setIsModalOpen, itemView } = props

    const dataUpdated = useSelector((state) => state.slice.dataUpdated)

    const onModalClose = () => {
        setIsModalOpen(false)
        dispatch(setIsFormUpdateMode(false))
    }
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const isFormUpdateMode = useSelector(state => state.slice.isFormUpdateMode)

    const handleUpdateExisting = async (event) => {
        try {
            event.preventDefault()
            if (itemValue) {
                const res = await Api.post('/updateitem', {
                    name: rowValue,
                    newname: itemValue
                })
                if (res.status === 200) {
                    setIsModalOpen(!isModalOpen)
                    setItemValue('')
                    dispatch(setDataUpdated(!dataUpdated))
                    dispatch(setIsFormUpdateMode(false))
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
                    dispatch(setDataUpdated(!dataUpdated))
                    dispatch(setIsFormUpdateMode(false))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewSubmit = async (event) => {
        try {
            event.preventDefault()
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
                    dispatch(setDataUpdated(!dataUpdated))
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
                    dispatch(setDataUpdated(!dataUpdated))
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
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {isFormUpdateMode ?
                            <h3 style={{ color: colors.grey[800] }}>
                                {itemView ? 'Update Item Name' : 'Update User'}
                            </h3>
                            :
                            <h3 style={{ color: colors.grey[800] }}>
                                {itemView ? 'Add Item' : 'Add User'}
                            </h3>
                        }
                        <form>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {itemView ?
                                    <IconTextField label="Item Name"
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
                                {isFormUpdateMode ?
                                    <Button size='medium'
                                        type='submit'
                                        onClick={(event) => handleUpdateExisting(event)}
                                        sx={{ background: colors.grey[800] }} variant='contained'>
                                        {itemView ? 'Update Item' : 'Update User'}
                                    </Button>
                                    :
                                    <Button size='medium'
                                        type='submit'
                                        onClick={(event) => handleNewSubmit(event)}
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
