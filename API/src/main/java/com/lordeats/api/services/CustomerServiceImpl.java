package com.lordeats.api.services;

import com.lordeats.api.dtos.GetCustomer;
import com.lordeats.api.dtos.PostCustomer;
import com.lordeats.api.dtos.UpdateCustomer;
import com.lordeats.api.entities.CustomerEntity;
import com.lordeats.api.repositories.CustomerRepository;
import com.lordeats.api.repositories.ReservationRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;
    private final int strength = 10;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());


    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, ReservationRepository reservationRepository) {
        this.customerRepository = customerRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public List<GetCustomer> getAllCustomers() {
        return StreamSupport.stream(customerRepository.findAll().spliterator(), false).map(customerEntity -> new GetCustomer(customerEntity.getId(),customerEntity.getNickname(),customerEntity.getPassword(),customerEntity.getReservationsId())).collect(Collectors.toList());
    }

    @Override
    public CustomerEntity addNewCustomer(PostCustomer postCustomer) {
        if(postCustomer.getNickname().equals("") || postCustomer.getPassword().equals(""))
            return null;
        if(customerRepository.existsByNickname(postCustomer.getNickname()))
            return null;
        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setNickname(postCustomer.getNickname());
        String encodedPassword = bCryptPasswordEncoder.encode(postCustomer.getPassword());
        customerEntity.setPassword(encodedPassword);

        customerRepository.save(customerEntity);
        if(customerRepository.existsById(customerEntity.getId()))
            return customerEntity;
        return null;
    }

    @Override
    public synchronized CustomerEntity logInCustomer(PostCustomer postCustomer) {
        String nickname = postCustomer.getNickname();
        String password = postCustomer.getPassword();
        if(customerRepository.existsByNickname(nickname)) {
            CustomerEntity customer = customerRepository.findByNickname(nickname);
            if(bCryptPasswordEncoder.matches(password,customer.getPassword())){
                customerRepository.loginUsersHashMap.put(String.valueOf(customer.getId()), nickname);
                return customer;
            }
        }
        return null;
    }

    @Override
    public synchronized boolean logOutCustomer(PostCustomer postCustomer) {
        if(customerRepository.existsByNickname(postCustomer.getNickname())) {
            CustomerEntity customer = customerRepository.findByNickname(postCustomer.getNickname());
            if(customer != null){
                customerRepository.loginUsersHashMap.remove(String.valueOf(customer.getId()), postCustomer.getNickname());
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean updateCustomer(UpdateCustomer updateCustomer) {
        if(customerRepository.existsById(updateCustomer.getId())) {
            CustomerEntity customer = customerRepository.findById(updateCustomer.getId());
            customer.setNickname(updateCustomer.getNickname());
            String encodedPassword = bCryptPasswordEncoder.encode(updateCustomer.getPassword());
            customer.setPassword(encodedPassword);
            customerRepository.save(customer);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCustomer(int id) {
        if(customerRepository.existsById(id)){
            CustomerEntity customer = customerRepository.findById(id);
            for(Integer reservationId: customer.getReservationsId()){
                reservationRepository.deleteById(reservationId);
            }
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteAllCustomers() {
        Iterable<CustomerEntity> customerList = customerRepository.findAll();
        for(CustomerEntity customer: customerList){
            if(customer.hasReservations()){
                for(Integer reservationId: customer.getReservationsId()){
                    reservationRepository.deleteById(reservationId);
                }
            }
            customerRepository.delete(customer);
        }
        return customerRepository.count() == 0;
    }
}
