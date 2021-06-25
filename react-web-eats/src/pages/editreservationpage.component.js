import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { createReservation, getReservationById, updateReservationById } from './../redux/actions/reservationsActionCreators';

const EditReservationPage = ({ match, history, dispatchCreateReservationAction, dispatchGetReservationAction, dispatchUpdateReservationAction }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [priceLevel, setPriceLevel] = useState('');
    const [fonNumber, setFonNumber] = useState('');
    const [ratingPoints, setRatingPoints] = useState('');
    const [webPage, setWebPage] = useState('');
    const [error, setError] = useState({ name: false, address: false, priceLevel: false, fonNumber: false, ratingPoints: false, webPage: false });


    useEffect(() => {
        const { reservationId } = match.params;
        if(reservationId) {
            dispatchGetReservationAction(reservationId, ({ name, address, priceLevel, fonNumber, ratingPoints, webPage }) => 
            {
                setName(name);
                setAddress(address);
                setPriceLevel(priceLevel);
                setFonNumber(fonNumber);
                setRatingPoints(ratingPoints);
                setWebPage(webPage);
            });
        }
    }, [dispatchGetReservationAction, match.params])

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            updateErrorFlags();
            const { reservationId } = match.params;
        
            if(reservationId) {
                const updateData = { name, address, priceLevel, fonNumber, ratingPoints, webPage };
                dispatchUpdateReservationAction(reservationId, updateData, () => {
                    toast.success('Reservation Updated!');
                    history.replace('/reservations')
                }, (message) => toast.error(`Error: ${message}`));
            } else {
                const customerNickname = JSON.parse(localStorage.getItem('USER_INFO')).nickname;
                const createData = { name, address, priceLevel, fonNumber, ratingPoints, webPage, customerNickname };
                dispatchCreateReservationAction(createData, () => {
                    toast.success('Reservation Created!');
                    history.replace('/reservations')
                }, (message) => toast.error(`Error: ${message}`));
            }
        }
    };

    const isFormInvalid = () => (!name.trim() || !address.trim() || !priceLevel.trim() || !fonNumber.trim() || !ratingPoints.trim() || !webPage.trim());
    
    const updateErrorFlags = () => {
        const errObj = { name: false, address: false, priceLevel: false, fonNumber: false, ratingPoints: false, webPage: false };
        if(!name.trim()) errObj.name = true;
        if(!address.trim()) errObj.address = true;
        if(!priceLevel.trim()) errObj.priceLevel = true;
        if(!fonNumber.trim()) errObj.fonNumber = true;
        if(!ratingPoints.trim()) errObj.ratingPoints = true;
        if(!webPage.trim()) errObj.webPage = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>Edit Reservation</h2>
                </div>
            </div>
            <div className="row align-items-center mt-4">
                <div className="col-9">
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input noValidate id="name"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`form-control ${error.name ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input noValidate id="address"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={`form-control ${error.address ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="priceLevel">Price Level</label>
                            <input noValidate id="priveLevel"
                                type="text"
                                placeholder="Price Level"
                                name="priveLevel"
                                value={priceLevel}
                                onChange={(e) => setPriceLevel(e.target.value)}
                                className={`form-control ${error.priceLevel ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                            <input noValidate id="fonNumber"
                                type="text"
                                placeholder="Phone Number"
                                name="fonNumber"
                                value={fonNumber}
                                onChange={(e) => setFonNumber(e.target.value)}
                                className={`form-control ${error.fonNumber ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="ratingPoints">Rating Points</label>
                            <input noValidate id="ratingPoints"
                                type="text"
                                placeholder="Rating Points"
                                name="ratingPoints"
                                value={ratingPoints}
                                onChange={(e) => setRatingPoints(e.target.value)}
                                className={`form-control ${error.ratingPoints ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="webPage">Web Page</label>
                            <input noValidate id="webPage"
                                type="text"
                                placeholder="Web Page"
                                name="webPage"
                                value={webPage}
                                onChange={(e) => setWebPage(e.target.value)}
                                className={`form-control ${error.webPage ? 'is-invalid' : ''}`} />
                                <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mr-2 btn-lg">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg" onClick={() => history.replace("/reservations")}>
                                Cancel | <i className="fas fa-window-close"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};


const mapDispatchToProps = dispatch => ({
    dispatchCreateReservationAction: (data, onSuccess, onError) =>
        dispatch(createReservation(data, onSuccess, onError)),
    dispatchUpdateReservationAction: (reservationId, data, onSuccess, onError) =>
        dispatch(updateReservationById(reservationId, data, onSuccess, onError)),
    dispatchGetReservationAction: (reservationId, onSuccess) =>
        dispatch(getReservationById(reservationId, onSuccess))
});
export default connect(null, mapDispatchToProps)(EditReservationPage);