import React, { useState, useEffect } from 'react'
import './Detail.css'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/styles/circle.css'
import { Radio, Rate, Space, Tabs } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/QuanLyRapType';
import { layThongTinChiTietPhimAction } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import TabPane from 'antd/es/tabs/TabPane';
export default function Detail() {

    const { id } = useParams()
    console.log("Movie ID:", id);
    const FilmDetail = useSelector(state => state.QuanLyPhimReducer)
    const filmDetail = FilmDetail.FilmDetail
    console.log("das", { FilmDetail })
   
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(layThongTinChiTietPhimAction(id))
    }, [])
    return (
        <div style={{ backgroundImage: `url(${FilmDetail.FilmDetail.hinhAnh})`, backgroundSize: "100%", backgroundPosition: 'center' }}>
            <div className="upper-layer w-full flex-wrap flex-col">

                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt="123" />
                            <div className="col-span-2 ml-5" style={{ marginTop: '20%' }}>
                                <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-4xl leading-3 my-5">{filmDetail.tenPhim}</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-4 ml-10">
                        <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span className="text-white">

                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>

                        </div>
                        <br />

                    </div>
                </div>



                <>
                    <Tabs defaultActiveKey="1" centered >
                        <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                            <div >
                                <Tabs tabPosition={'left'} >
                                    {FilmDetail.FilmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={<div className="flex flex-row items-center justify-center">
                                                <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                                <div className="text-center ml-2">
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>}
                                            key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className="mt-5" key={index}>
                                                    <div className="flex flex-row">
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}



                                        </TabPane>
                                    })}


                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </>
            </div>

        </div>
    );
}
