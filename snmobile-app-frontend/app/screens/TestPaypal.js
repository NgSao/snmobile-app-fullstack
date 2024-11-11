import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { GET_ALL, POST_ADD } from '../api/apiService';

const TestPaypal = ({ navigation }) => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const createPayment = async () => {
        try {
            const response = await POST_ADD('paypal', {
                total: '210',
                currency: 'USD',
            });

            setPaymentUrl(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating payment:', error);
            Alert.alert('Error', 'Không thể tạo URL thanh toán');
        }
    };

    useEffect(() => {
        createPayment();
    }, []);

    const handleNavigationStateChange = (event) => {
        const { url } = event;

        if (url.includes('/success')) {
            const params = new URLSearchParams(url.split('?')[1]);
            const paymentId = params.get('paymentId');
            const payerId = params.get('PayerID');
            const token = params.get('token');

            confirmPayment(paymentId, token, payerId);
        }

        if (url.includes('/cancel')) {
            Alert.alert('Thanh toán thất bại', 'Thanh toán đã bị hủy');
            navigation.goBack();
        }
    };

    // Xác nhận thanh toán từ PayPal
    const confirmPayment = async (paymentId, token, payerId) => {
        try {
            const response = await GET_ALL(`paypal/success?paymentId=${paymentId}&token=${token}&PayerID=${payerId}`);
            if (response.status === 200) {
                Alert.alert('Thanh toán thành công', 'Thanh toán đã được xác nhận');
            } else {
                Alert.alert('Lỗi thanh toán', 'Thanh toán không thành công');
            }
            navigation.goBack(); // Quay lại màn hình trước
        } catch (error) {
            console.error('Error confirming payment:', error);
            Alert.alert('Lỗi xác nhận thanh toán', 'Đã xảy ra lỗi khi xác nhận thanh toán');
        }
    };


    return (
        <View style={{ flex: 1 }}>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <WebView
                source={{ uri: paymentUrl }}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default TestPaypal;
