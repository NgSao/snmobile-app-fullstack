package com.nguyensao.snmobile_app_backend.controller;

import java.io.IOException;
import java.util.Random;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.otp.SpeedSMSAPI;

@RestController
@RequestMapping("/api/otp")
public class OTPController {

    /**
     * Endpoint gửi mã OTP đến số điện thoại để xác thực người dùng
     * 
     * @param phoneNumber Số điện thoại của người nhận OTP
     * @return Thông báo kết quả gửi OTP
     */
    @GetMapping
    public String sendOTP(@RequestParam String phoneNumber) {
        // Tạo mã OTP ngẫu nhiên 6 chữ số
        String otp = generateOTP();

        // Nội dung tin nhắn chứa mã OTP
        String message = "Mã xác thực của bạn là: " + otp;

        // Khởi tạo SpeedSMSAPI với mã truy cập của bạn
        SpeedSMSAPI api = new SpeedSMSAPI("_x2aRKdbdKlh7hosj43vWGBuemjY-7w6");

        try {
            String result = api.sendSMS(phoneNumber, message, 2, "b10dd7b9ee960337");
            return "OTP đã được gửi thành công: " + result + ". Mã OTP của bạn là: " + otp;
        } catch (IOException e) {
            e.printStackTrace();
            return "Lỗi khi gửi OTP: " + e.getMessage();
        }
    }

    /**
     * Phương thức tạo mã OTP ngẫu nhiên gồm 6 chữ số
     * 
     * @return Mã OTP dưới dạng chuỗi
     */
    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Tạo số từ 100000 đến 999999
        return String.valueOf(otp);
    }
}
