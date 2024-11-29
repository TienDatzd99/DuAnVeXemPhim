import React, { useCallback, useEffect, useState } from 'react';
import './Detail.css';
import { useDispatch, useSelector } from 'react-redux';
import './circle.css';
import { Button, message, Rate, Tabs } from 'antd';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { layThongTinChiTietPhimAction } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import { layDanhGiaAction, themDanhGiaAction } from '../../redux/actions/QuanLyPhimAction';

const { TabPane } = Tabs;

export default function Detail() {

  const { danhGiaFilm } = useSelector(state => state.QuanLyPhimReducer);
  console.log('danhGiaFilm', danhGiaFilm);

  const { id } = useParams();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    if (review.trim() === '' || rating === 0) {
      message.error('Vui lòng nhập đánh giá và chọn số sao.');
      return;
    }

    // Tạo đối tượng đánh giá
    const danhGia = {
      soSao: rating,
      binhLuan: review,
    };
    console.log('danhGia', danhGia);

    // Dispatch action gửi đánh giá
    dispatch(themDanhGiaAction(id, danhGia));

    dispatch(layDanhGiaAction(id));
    message.success('Cảm ơn bạn đã đánh giá!');
    setReview('');
    setRating(0);
    setIsReviewUpdated(!isReviewUpdated);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const FilmDetail = useSelector(state => state.QuanLyPhimReducer.FilmDetail);

  useEffect(() => {
    dispatch(layDanhGiaAction(id));
    dispatch(layThongTinChiTietPhimAction(id));
  }, [dispatch, id, isReviewUpdated]);

  // Sử dụng useCallback để ghi nhớ hàm và tránh tạo lại mỗi lần render
  const kiemTraDangNhap = useCallback(
    (lichChieu) => {
      if (userLogin && userLogin.accessToken) {
        return `/checkout/${lichChieu.maLichChieu}`;
      } else {
        return `/login`;
      }
    },
    [userLogin]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="upper-layer w-full flex-grow flex flex-col transparent-black-background">
        {/* Thông tin phim */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-3">
            <div className="grid grid-cols-3 text-white">
              <img
                className="col-span-1 object-cover rounded w-full h-72"
                src={FilmDetail?.hinhAnh}
                alt={FilmDetail?.tenPhim}
              />
              <div className="col-span-2 ml-5 mt-4 md:mt-0">
                <p className="text-sm">Ngày chiếu: {moment(FilmDetail?.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                <h2 className="text-2xl leading-6 my-1">{FilmDetail?.tenPhim}</h2>
                <p>{FilmDetail?.moTa}</p>
              </div>
            </div>
          </div>

          {/* Đánh giá */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 ml-0 md:ml-10">
            <div className='flex flex-col justify-center items-center'>
              <h3 className="text-yellow-500 font-bold text-lg mb-2">Đánh giá</h3>
              <Rate
                allowHalf
                value={FilmDetail?.danhGia / 2}
                style={{ color: '#78ed78', fontSize: 30 }}
              />
              <div className={`c100 p${FilmDetail?.danhGia * 10} big`}>
                <span className="text-white pl-5">
                  {(FilmDetail?.danhGia * 10).toFixed(2)}%
                </span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Lịch chiếu và Đánh giá */}
        <div className="mt-10 w-full max-w-5xl mx-auto bg-white px-5 py-5 flex-grow mb-2 rounded-md overflow-auto">
          <Tabs defaultActiveKey="1" centered responsive>
            {/* Tab Lịch chiếu */}
            <TabPane tab="Lịch chiếu" key="1">
              <Tabs tabPosition="left" className="w-full">
                {FilmDetail?.heThongRapChieu?.map((htr) => (
                  <TabPane
                    tab={
                      <div className="flex items-center">
                        <img
                          src={htr.logo}
                          className="rounded-full w-12 h-12"
                          alt={htr.tenHeThongRap}
                        />
                        <span className="ml-2">{htr.tenHeThongRap}</span>
                      </div>
                    }
                    key={htr.maHeThongRap}
                  >
                    {htr.cumRapChieu?.map((cumRap) => (
                      <div className="mt-5" key={cumRap.maCumRap}>
                        <div className="flex items-center">
                          <img
                            src={cumRap.hinhAnh}
                            alt={cumRap.tenCumRap}
                            className="object-cover rounded w-10 h-10"
                          />
                          <div className="ml-2">
                            <p className="text-lg font-bold">{cumRap.tenCumRap}</p>
                            <p className="text-gray-400">{cumRap.diaChi}</p>
                          </div>
                        </div>
                        <div className="thong-tin-lich-chieu grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                          {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu) => (
                            <NavLink
                              to={kiemTraDangNhap(lichChieu)}
                              key={lichChieu.maLichChieu}
                              className="block text-green-800 font-bold text-center border border-green-800 rounded p-2 hover:bg-green-800 hover:text-white transition w-24"
                            >
                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabPane>
                ))}
              </Tabs>
            </TabPane>

            {/* Tab Đánh giá */}
            <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
              <div className="p-4">
                {danhGiaFilm?.length > 0 ? (
                  <div className="comment-section">
                    {danhGiaFilm.map((danhGia, index) => (
                      <div key={index} className="mb-4">
                        <Rate disabled value={danhGia.soSao} />
                        <p>{danhGia.nguoiBinhLuan || "Ẩn Danh"}</p>
                        <p>{danhGia.binhLuan}</p>
                        <p>{moment(danhGia.ngayBinhLuan).format('DD.MM.YYYY HH:mm')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Chưa có đánh giá nào cho phim này.</p>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-4">Đánh giá phim</h3>
                <div className="mb-4">
                  <Rate onChange={handleRatingChange} value={rating} />
                </div>
                <div className="mb-4">
                  <TextArea
                    rows={4}
                    placeholder="Nhập đánh giá của bạn..."
                    value={review}
                    onChange={handleReviewChange}
                  />
                </div>
                <Button type="primary" onClick={handleSubmitReview}>
                  Gửi Đánh Giá
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}