package com.lordeats.api.services;

import com.lordeats.api.dtos.GetReservation;
import com.lordeats.api.dtos.PostReservation;
import com.lordeats.api.dtos.UpdateReservation;
import com.lordeats.api.entities.CustomerEntity;
import com.lordeats.api.entities.ReservationEntity;
import com.lordeats.api.repositories.CustomerRepository;
import com.lordeats.api.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, CustomerRepository customerRepository) {
        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public List<GetReservation> getAllReservations() {
        return StreamSupport.stream(reservationRepository.findAll().spliterator(), false).map(
                reservationEntity -> new GetReservation(reservationEntity.getId(), reservationEntity.getName(),
                        reservationEntity.getAddress(), reservationEntity.getPriceLevel(), reservationEntity.getFonNumber(),
                        reservationEntity.getRatingPoints(), reservationEntity.getWebPage(),
                        reservationEntity.getCustomer().getId())).collect(Collectors.toList());
    }

    @Override
    public List<GetReservation> getCustomerReservations(String nickname) {
        if(customerRepository.existsByNickname(nickname)){
            CustomerEntity customer =  customerRepository.findByNickname(nickname);
            return customer.getReservations();
        }
        return null;
    }

    @Override
    public GetReservation getReservation(int id) {
        ReservationEntity reservationEntity = reservationRepository.findById(id);
        if(reservationEntity != null)
            return new GetReservation(reservationEntity.getId(), reservationEntity.getName(),
                reservationEntity.getAddress(), reservationEntity.getFonNumber(), reservationEntity.getPriceLevel(),
                reservationEntity.getRatingPoints(), reservationEntity.getWebPage(),
                reservationEntity.getCustomer().getId());
        return null;
    }

    private void setNewReservation(ReservationEntity reservationEntity, String name, String address, String priceLevel, String fonNumber, String ratingPoints, String webPage) {
        reservationEntity.setName(name);
        reservationEntity.setAddress(address);
        reservationEntity.setFonNumber(fonNumber);
        reservationEntity.setPriceLevel(priceLevel);
        reservationEntity.setRatingPoints(ratingPoints);
        reservationEntity.setWebPage(webPage);
    }

    @Override
    public boolean addNewReservation(PostReservation postReservation) {
        if(!customerRepository.existsByNickname(postReservation.getCustomerNickname()))
            return false;
        ReservationEntity reservationEntity = new ReservationEntity();
        setNewReservation(reservationEntity, postReservation.getName(), postReservation.getAddress(), postReservation.getPriceLevel(),
                postReservation.getFonNumber(), postReservation.getRatingPoints(),
                postReservation.getWebPage());

        reservationEntity.setCustomer(customerRepository.findByNickname(postReservation.getCustomerNickname()));
        reservationRepository.save(reservationEntity);
        return reservationRepository.existsById(reservationEntity.getId());
    }



    @Override
    public boolean updateReservation(int reservationId, UpdateReservation updateReservation) {
        if(reservationRepository.existsById(reservationId)) {
            ReservationEntity reservationEntity = reservationRepository.findById(reservationId);
            setNewReservation(reservationEntity, updateReservation.getName(), updateReservation.getAddress(), updateReservation.getPriceLevel(),
                    updateReservation.getFonNumber(), updateReservation.getRatingPoints(),
                    updateReservation.getWebPage());

            reservationRepository.save(reservationEntity);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteReservation(int id) {
        if(reservationRepository.existsById(id)){
            reservationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteAllReservations() {
        Iterable<ReservationEntity> reservationList = reservationRepository.findAll();
        for(ReservationEntity reservation: reservationList){
            reservationRepository.delete(reservation);
        }
        return reservationRepository.count() == 0;
    }
}
