import React, { useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import './Film_Flip.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

export default function Film_Flip(props) {
    const navigate = useNavigate();
    const { item } = props;
    console.log('item', item);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');

    const showModal = () => {
        if (item.trailer) {
            let url = item.trailer;
            if (url.includes('watch?v=')) {
                url = url.replace('watch?v=', 'embed/');
            }
            // Thêm autoplay nếu muốn video tự động phát khi mở Modal
            setTrailerUrl(`${url}?autoplay=1`);
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setTrailerUrl(''); // Reset trailerUrl để gỡ iframe
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTrailerUrl(''); // Reset trailerUrl để gỡ iframe
    };

    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={item.hinhAnh}
                        alt="Avatar"
                        style={{ width: 300, height: 300 }}
                        onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }}
                    />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <img
                            src={item.hinhAnh}
                            alt="Avatar"
                            style={{ width: 300, height: 300 }}
                            onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }}
                        />
                    </div>
                    <div
                        className="w-full h-full"
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0,.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <button
                                className="rounded-full cursor-pointer"
                                onClick={showModal}
                            >
                                <PlayCircleOutlined style={{ fontSize: '50px' }} />
                            </button>
                            <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => navigate(`/detail/${item.maPhim}`)}
                className="bg-orange-300 text-center cursor-pointer py-2 my-2 text-success-50 font-bold"
            >
                ĐẶT VÉ
            </div>

            <Modal
                title="Xem Trailer"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} // Loại bỏ footer mặc định để chỉ có video và nút đóng
                width={800}
            >
                <div className="video-responsive">
                    {trailerUrl && (
                        <iframe
                            key={trailerUrl} // Thêm key để bắt buộc React remount iframe
                            width="100%"
                            height="450"
                            src={trailerUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </Modal>
        </div>
    );
}