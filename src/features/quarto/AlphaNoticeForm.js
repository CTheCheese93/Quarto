import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { alphaNoticeWasAccepted, selectAlphaNoticeAccepted } from './quartoSlice'

const AlphaNoticeForm = () => {
    const dispatch = useDispatch()
    const alphaNoticeAccepted = useSelector(selectAlphaNoticeAccepted)
    const [alphaNoticeAcceptanceForm, setAlphaNoticeAcceptanceForm] = useState(false)

    const handleAcceptanceChange = (e) => setAlphaNoticeAcceptanceForm(e.target.checked)

    const onContinueClicked = (e) => {
        e.preventDefault()
        if (alphaNoticeAcceptanceForm === true) {
            dispatch(alphaNoticeWasAccepted())
        }
    }

    return (
        <Modal show={!alphaNoticeAccepted}>
            <Modal.Header style={{justifyContent: 'center'}}>
                <Modal.Title>Welcome Players!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    This website is a passion project of mine and is currently in alpha.
                </p>
                <p>
                    As such, there are bound to be bugs to be found and improvements to be made.
                    One of my next steps is giving users the opportunity to inform me of what they'd like to see
                    and what needs fixed.
                </p>
                <p>
                    All game information is local to you.
                    All game data will be reset on every refresh of the page.
                </p>
                <p>
                    SSL is not being used at this time. Please do not enter any sensitive information anywhere.
                </p>
                <p>
                    Thank you for taking the time to look at my work!
                </p>
                <Form onSubmit={onContinueClicked}>
                    <Form.Group controlId="alpha-acceptance" className="d-flex justify-content-center">
                        <Form.Check 
                            type="checkbox"
                            label="I understand this website is in alpha."
                            onChange={handleAcceptanceChange}
                            value={alphaNoticeAcceptanceForm} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={!alphaNoticeAcceptanceForm}>
                            Continue
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AlphaNoticeForm