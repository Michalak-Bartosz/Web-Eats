import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteReservationById } from './../redux/actions/reservationsActionCreators';

const ReservationsCollection = ({ reservations, dispatchDeleteAction }) => {

    const [selectedReservation, setSelectedReservation] = useState('');

    const showConfirmationModal = (event, reservationId) => {
        event.preventDefault();
        setSelectedReservation(reservationId);
        window.$('#confirmationModal').modal('show');
    };

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedReservation, () => {
            window.$('#confirmationModal').modal('hide');
            toast.success('Reservation Deleted!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    return (
        <React.Fragment>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Price Level</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Rating Points</th>
                        <th scope="col">WebPage</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservations.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`edit-reservation/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td> {item.address} </td>
                                <td> {item.priceLevel} </td>
                                <td> {item.fonNumber} </td>
                                <td> {item.ratingPoints} </td>
                                <td> <a rel="noopener noreferrer" target="_blank" href={`${item.webPage}`} > {item.webPage} </a> </td>
                                <td>
                                    <a href="/" onClick={(e) => showConfirmationModal(e, item.id)}>
                                        <i className="fas fa-trash-alt fa-2x text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Modal handleOnDelete={handleOnDelete} />
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (reservationId, onSuccess, onError) =>
        dispatch(deleteReservationById(reservationId, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(ReservationsCollection);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this reservation?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" onClick={handleOnDelete} data-dismiss="modal" className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);