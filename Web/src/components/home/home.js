import React, { Component } from 'react'
import { firebase } from '../../firebase'
import Image from '../../images/medicine.jpg'

class Home extends Component {

    toggleManufacturer = () => {
        console.log(this.props)
        this.props.history.push('/manufacturer')
    }

    toggleAdmin = () => {
        this.props.history.push('/admin')
    }

    toggleDistributor = () => {
        this.props.history.push("/distributor")
    }


    render() {
        return (
            <section className="p-5" style={{
                background: `url(${Image})`,
                backgroundSize : "cover",
                backgroundRepeat : "no-repeat",
                backgroundPosition :"center"
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="button-wrapper">
                                <div className="button">
                                    <div className="button-header mb-4 text-center" style={{ fontWeight: "100", fontSize: "40px" }}>
                                        Manufacturer
                                    </div>
                                    <div className="button-image">
                                        <i className="fa fa-industry fa-5x"></i>

                                    </div>
                                    <div className="button-text">
                                        now secure your data as you will not even believ iy is posisbdnnd
                                    </div>
                                    <div className="button-button text-center mt-3">
                                        <button className="btn btn-primary mx-auto btn-block" onClick={this.toggleManufacturer} style={{ width: "60%" }}>Go To Manufacturer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="button-wrapper">
                                <div className="button">
                                    <div className="button-header mb-4 text-center" style={{ fontWeight: "100", fontSize: "40px" }}>
                                        Distributor
                                    </div>
                                    <div className="button-image">
                                        <i className="fa fa-plane fa-5x"></i>

                                    </div>
                                    <div className="button-text">
                                        now secure your data as you will not even believ iy is posisbdnnd
                                    </div>
                                    <div className="button-button text-center mt-3">
                                        <button className="btn btn-primary mx-auto btn-block" onClick={this.toggleDistributor} style={{ width: "60%" }}>Go to Distributor</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <div className="button-wrapper">
                                <div className="button">
                                    <div className="button-header mb-4 text-center" style={{ fontWeight: "100", fontSize: "40px" }}>
                                        Manufacturer
                                    </div>
                                    <div className="button-image">
                                        <i className="fa fa-industry fa-5x"></i>

                                    </div>
                                    <div className="button-text">
                                        now secure your data as you will not even believ iy is posisbdnnd
                                    </div>
                                    <div className="button-button text-center mt-3">
                                        <button className="btn btn-primary mx-auto btn-block" onClick={this.toggleManufacturer} style={{ width: "60%" }}>Go To Manufacturer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="button-wrapper">
                                <div className="button">
                                    <div className="button-header mb-4 text-center" style={{ fontWeight: "100", fontSize: "40px" }}>
                                        Admin
                                    </div>
                                    <div className="button-image">
                                        <i className="fa fa-user fa-5x"></i>

                                    </div>
                                    <div className="button-text">
                                        now secure your data as you will not even believ iy is posisbdnnd
                                    </div>
                                    <div className="button-button text-center mt-3">
                                        <button className="btn btn-primary mx-auto btn-block" onClick={this.toggleAdmin} style={{ width: "60%" }}>Go To Admin Page</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home