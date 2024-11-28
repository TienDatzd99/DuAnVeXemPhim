import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './Checkout.module.css'
import './Checkout.css'
import { datGheAction, datVe, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'

import { Tabs } from 'antd';
import moment from 'moment'
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import Loading from '../../components/Loading/Loading'
import { connection } from '../..'
import { TOKEN, USER_LOGIN } from '../../util/settings/config'
function Checkout() {


  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)


  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
  console.log('danhSachGheDangDat', danhSachGheDangDat);



  const { id } = useParams()
  console.log('action', id);
  const dispatch = useDispatch()



  useEffect(() => {
    const action = layChiTietPhongVeAction(id)

    dispatch(action)
  }, [])






  if (!chiTietPhongVe || !chiTietPhongVe.thongTinPhim) {
    return <div><Loading /></div>;
  }
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat ' : '';
      let classGheDangDat = ''
      let classGheKhachDat = ''
      let indexGheKD = danhSachGheKhachDat.findIndex(GheKD => GheKD.maGhe === ghe.maGhe)
      if (indexGheKD !== -1) {
        classGheKhachDat = 'gheKhachDat'
      }
      let indexGheDD = danhSachGheDangDat.findIndex(GheDD => GheDD.maGhe === ghe.maGhe)
      if (indexGheDD !== -1) {
        classGheDangDat = 'gheDangDat'
      }

      let classGheMinhDaDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheMinhDaDat = 'gheDaDuocDat'
      }

      return <Fragment key={index}>


        <button disabled={ghe.daDat || classGheMinhDaDat !== ''} className={`${classGheVip} ${classGheDangDat} ${classGheDaDat} ${classGheMinhDaDat} ${classGheKhachDat} ghe md:m-2 lg:m-3 xl:m-4 w-1/12  text-center`} key={index}

          onClick={() => {
            // const action = datGheAction(ghe, id)
            dispatch(
              {
                type: DAT_VE,
                gheDuocChon: ghe
              }
              // action
            )
          }}>




          {ghe.daDat ? classGheMinhDaDat !== '' ?
            <UserOutlined /> :
            <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
            : classGheKhachDat !== '' ? <SmileOutlined /> : ghe.stt}


        </button>





        {(index + 1) % 16 === 0 ? <br /> : ''}


      </Fragment>
    })
  }


  return (
    <div className="min-h-screen p-5" style={{ padding: '20px' }}>
      <div className='grid grid-cols-12'>
        <div className='col-span-9  ' style={{ marginLeft: "5%", paddingLeft: "10%", paddingRight: "7%", }}>

          <div className='manHinh mt-20'>
            <img className='w-full' st src='https://movie-booking-project.vercel.app/img/bookticket/screen.png' style={{ height: "70px" }} />
          </div>
          <div className='transparent-checkout-black-background flex flex-wrap '>
            {renderSeats()}
          </div>
          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th style={{ minWidth: 120 }}>Ghế chưa đặt</th>
                  <th style={{ minWidth: 120 }}>Ghế đang đặt</th>
                  <th style={{ minWidth: 120 }}>Ghế vip</th>
                  <th style={{ minWidth: 120 }}>Ghế đã đặt</th>
                  <th style={{ minWidth: 120 }}>Ghế mình đặt</th>
                  <th style={{ minWidth: 160 }}>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="table-cell-center" >
                    <button className="ghe text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                  <td >
                    <button className="ghe gheDangDat text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                  <td >
                    <button className="ghe gheVip text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                  <td >
                    <button className="ghe gheDaDat text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                  <td >
                    <button className="ghe gheDaDuocDat text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                  <td >
                    <button className="ghe gheKhachDat text-center">
                      <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>



        </div>







        <div className='col-span-3'>
          <h3 className='text-center text-green-400' style={{ fontSize: 41, fontWeight: "bold" }}>  {danhSachGheDangDat.reduce((TongTien, ghe) => TongTien += ghe.giaVe, 0).toLocaleString()}</h3>
          <hr />
          <h3 className=' text-xl  font-bold'>{thongTinPhim.tenPhim}</h3>
          <p>Địa điểm: BHD Star - Vincom 3/2</p>
          <p>Ngày Chiếu: 25/04/2021 - 12:05 RẠP 5</p>
          <hr />
          <div className='grid grid-cols-2 my-3'>
            <div className='col-span-1'>

              <div className='flex flex-wrap'>
                <span className='text-red-400 leading-1' style={{ fontSize: "18px", }}>Ghế</span>
                {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                  return <span style={{ lineHeight: "25px" }} className='text-xl text-green-500 px-1' key={index}>{gheDD.stt}</span>
                })}
              </div>
            </div>

            <div className='text-right text-lg col-span-1'>
              <span className='text-green-800'>
                {danhSachGheDangDat.reduce((TongTien, ghe) => TongTien += ghe.giaVe, 0).toLocaleString()}
              </span>
            </div>
          </div>

          <hr />
          <div className='my-5'>
            <i>Email</i><br />
            {userLogin.email}

          </div>
          <hr />
          <div className='my-5'>
            <i>Phone</i><br />
            {userLogin.soDT}

          </div>
          <hr />
          <div className='mb-0  flex flex-col justify-end items-center'>
            <div className={`${style['buttondatve']} bg-green-500 text-white w-full text-center py-2 text-2xl`} style={{ cursor: "pointer" }}
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = id
                thongTinDatVe.danhSachVe = danhSachGheDangDat

                dispatch(datVeAction(thongTinDatVe))
              }}
            >
              Đặt Vé
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: '01 CHỌN GHẾ & THANH TOÁN',
    children: <Checkout />,
  },
  {
    key: '2',
    label: '02 KẾT QUẢ ĐẶT VÉ',
    children: <KetQuaDatVe />,
  },

];
function App() {
  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  const nagivate = useNavigate()

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  useEffect(() => {
    return () => {
      dispatch({
        type: 'CHANGE_TAB_ACTIVE',
        number: '1'
      })
    }
  }, [])



  const operations = <Fragment>
    {!_.isEmpty(userLogin) ?
      <Fragment>
        <button onClick={() => {
          nagivate('/profile')
        }}>
          {/* <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">
      {userLogin.taiKhoan.substr(0, 1)} 
    </div> */}
          Hello ! {userLogin.taiKhoan}
        </button>
        <button onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          nagivate('/home');
          window.location.reload();
        }} className="text-blue-800">Đăng xuất</button> </Fragment> : ''}
  </Fragment>

  return <div>
    <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} items={items} className='px-4' onChange={(key) => {

      dispatch({
        type: 'CHANGE_TAB_ACTIVE',
        number: key.toString()
      })
    }} />;
  </div>
}
export default App;


function KetQuaDatVe() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log('thongsTinxcNguoiDung', thongTinNguoiDung);



  useEffect(() => {
    const action = layThongTinNguoiDungAction(thongTinNguoiDung);
    dispatch(action)
  }, [])



  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return <div className="p-2 lg:w-1/3 md:w-1/2 w-full " key={index}>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
            <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
            <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
            <p>
              <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
            </p>
          </div>
        </div>
      </div>
    })
  }

  return <div className="p-5 ">

    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">Lịch sử đặt vé khách hàng</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa và thời gian để xem phim vui vẻ bạn nhé !</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {renderTicketItem()}
          {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
                <p className="text-gray-500">10:20 Rạp 5, Hệ thống rạp cinestar bhd </p>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </section>

  </div>
}