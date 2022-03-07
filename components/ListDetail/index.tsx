import React, {useState,useEffect} from 'react'
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../interfaces'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './ListDetail.module.scss'

type ListDetailProps = {
  product: Product
}

const ListDetail = ({ product: product }: ListDetailProps) => {
    const [selectVariant, setSelectVariant] = useState<any>(0)
    const getPrice = () => {
        return (
            `${product.variants[selectVariant].price} TL`
        )
    }
    useEffect(() => {
        getPrice()
    },[selectVariant])
    return (
        <div className='row mt-4'>
            <div className="col-md-6">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination
                    spaceBetween={30}
                    slidesPerView={1}
                    className={styles.swiper}
                >
                {product.images.map((image,i) => {
                    return (
                        <SwiperSlide key={i} className={styles.swiperSlide}>
                            <div className={styles.swiperSlideItem}>
                                <img src={image.src}/>
                            </div>
                        </SwiperSlide>
                        )
                    })
                }
                </Swiper>
            </div>
            <div className='col-md-6'>
                <h1>{product.title}</h1>
                <h2>{product.vendor}</h2>
                <p>{product.id}</p>
                <hr/>
                <div className='row d-flex align-items-center'>
                    <div className='col-md-3'>Seçenekler</div>
                    <div className='col-md-4'>
                        <select className="form-control" defaultValue={selectVariant} onChange={(e) => setSelectVariant(e.target.value)}>
                            {
                                product.variants.map((variant,v) => {
                                    return <option key={v} value={v}>{variant.title}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <hr/>
                <p>{getPrice()}</p>
            </div>
            <hr />
            
            <div dangerouslySetInnerHTML={{ __html:product.body_html}}></div>
        </div>
    )
}

export default ListDetail