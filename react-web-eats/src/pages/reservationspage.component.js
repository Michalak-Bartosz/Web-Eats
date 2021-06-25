import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './reservation.css';

import ReservationsCollection from '../components/reservationscollection.component';
import { fetchAllReservations } from './../redux/actions/reservationsActionCreators';


const ReservationsPage = ({ loading, reservations, dispatchFetchAllReservationsAction }) => {
    useEffect(() => dispatchFetchAllReservationsAction(JSON.parse(localStorage.getItem('USER_INFO')).nickname, () => {
        console.log('Reservations Loaded Correctly!');
    }, () => console.log("Reservation could not be loaded!")), [dispatchFetchAllReservationsAction]);
    return (
        <React.Fragment>
            <div className="row my-5">
                <div className="col-10">
                    <h2>Manage Reservations</h2>
                </div>
                <div className="col-2">
                    <Link to="/edit-reservation" className="btn btn-primary">
                        Create Reservation | <i className="fas fa-plus-circle"></i>
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    {
                        reservations.length > 0 ? <ReservationsCollection reservations={reservations} /> :
                        <div className="text-center mt-5">
                            <h1><i className="fas fa-times"></i></h1>
                            <h1 className="text-center">You don't have any reservations.</h1>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    loading: state.loading,
    reservations: state.reservations
});
const mapDispatchToProps = dispatch => ({
    dispatchFetchAllReservationsAction: (data, onSuccess, onError) => 
    dispatch(fetchAllReservations(data, onSuccess, onError))
});
export default connect(mapStateToProps,mapDispatchToProps)(ReservationsPage);