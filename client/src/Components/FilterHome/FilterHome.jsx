import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Item from '../Item/Item';
import { Context } from '../../Context/Context';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import './FilterHome.css';

const FilterHome = () => {
    const { productsdata, loading, error } = useContext(Context);

    const [categoryFilter, setCategoryFilter] = useState('shirt');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (productsdata && productsdata.length > 0) {
            const filtered = productsdata.filter(item =>
                item.category.toLowerCase() === categoryFilter.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    }, [productsdata, categoryFilter]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const buttonVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="flex flex-col items-center gap-4 Parent">
            <h2 className="md:text-[36px] font-sb xsm:text-[24px] Child-1">SHOP BY CATEGORY</h2>
            <div className="bd">
                {['shirt', 'TShirt', 'Trouser', 'Jeans'].map(type => (
                    <motion.button
                        key={type}
                        className={`btn ${categoryFilter === type ? 'selected' : ''}`}
                        onClick={() => setCategoryFilter(type)}
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </motion.button>
                ))}
            </div>
            <AliceCarousel
                mouseTracking
                responsive={{
                    0: { items: 2.5 },
                    600: { items: 3.5 },
                    1024: { items: 3.5 },
                    1280: { items: 3 }
                }}
                disableButtonsControls
                controlsStrategy="default"
                items={filteredProducts.slice(0, 6).map(item => (
                    <div className="carousel-item xl:px-10 lg:px-3 md:px-1" key={item.id}>
                        <Item item={item} />
                    </div>
                ))}
                className="custom-carousel w-[1280px]"
            />
            <Link to={`category/${categoryFilter.toLowerCase()}`} className="cd">
                <motion.button className="selected-2" whileHover={{ scale: 1.1 }}>View All</motion.button>
            </Link>
        </div>
    );
}

export default FilterHome;
