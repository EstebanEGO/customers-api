import React from 'react';
import Common from '../utils/common';
import { Link, useSearchParams } from "react-router-dom";
import { Navigate } from 'react-router'
import Customer from "../models/Customer";
import States from '../utils/states';
import ApiRest from '../utils/api_rest';

class Create extends React.Component {
    constructor(props) {
        super(props);        
    }    
    state = { customer: new Customer(), states: States, saved: false, customer_id: null }

    sendForm = e => {
        e.preventDefault();
        let url = Common.url_api, method = 'POST';
        if (this.state.customer_id) {
            url = url + `/${ this.state.customer_id }`;
            method = 'PUT';
        }
        ApiRest(url, () => this.setState({saved: true}), JSON.stringify(this.state.customer), method);
    }

    handleSetData = e => {
        const { customer } = this.state;
        customer[e.target.name] = e.target.value;
        this.setState({customer});
    }

    componentDidMount() {
        const {customer_id} = this.props;
        if (customer_id) {
            ApiRest(Common.url_api + `/${ customer_id }`, data => this.setState({customer: data, customer_id}));            
        }
    }

    render() { 
        const { customer, states, saved, customer_id } = this.state;
        if (saved) return <Navigate to='/'/>
        return (             
            <div className="card">
                <div className="card-header">
                    { Common[(customer_id ? 'edit' : 'add')] } { Common.customer }
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" onSubmit={ this.sendForm }>
                          <div className="col-md-4">
                            <label htmlFor="name" className="form-label">{ Common.name }</label>
                            <input type="text" className="form-control" onChange={ this.handleSetData } id="name" name='name' value={ customer.name } required />
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="surnames" className="form-label">{ Common.surnames }</label>
                            <input type="text" className="form-control" id='surnames' name="surnames" onChange={ this.handleSetData } value={ customer.surnames } required />
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="phone" className="form-label">{ Common.phone }</label>
                            <input type="phone" className="form-control" id='phone' name="phone" onChange={ this.handleSetData } value={ customer.phone } required maxLength={10}/>
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="email" className="form-label">{ Common.email }</label>
                            <input type="email" className="form-control" id='email' name="email" onChange={ this.handleSetData } value={ customer.email } required />
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="age" className="form-label">{ Common.age }</label>
                            <input type="number" className="form-control" id='age' name="age" onChange={ this.handleSetData } value={ customer.age } required />
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                          </div>                          
                          <div className="col-md-4">
                            <label htmlFor="state" className="form-label">{ Common.state }</label>
                            <select className="form-select" id="state" name='state' onChange={ this.handleSetData } value={ customer.state } required>                              
                              { 
                                states.map(state => (
                                    <option key={ state.id } value={ state.id }>{ state.name }</option>  
                                ))
                              }
                            </select>
                            <div className="invalid-feedback">
                              Please select a valid state.
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary" type="submit">{ Common.send }</button>
                            <Link className="btn btn-secondary " to={ "/" } role="button">{ Common.cancel }</Link>
                          </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Create;