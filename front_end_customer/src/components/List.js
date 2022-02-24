import React from 'react';
import Common from '../utils/common';
import { Link } from "react-router-dom";
import States from '../utils/states';
import ApiRest from '../utils/api_rest';
import Moment from 'moment';
class List extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { loaded: false, customers: [], states: States }

    delete = id => {
        ApiRest(Common.url_api + `/${ id }`, () => this.loadData(), null, 'DELETE');
    }

    loadData() {
        ApiRest(Common.url_api, data => this.setState({loaded: true, customers: data}));
    }

    componentDidMount() {
        this.loadData()
    }

    render() { 
        const {loaded, customers, states} = this.state;
        Moment.locale('es');
        if (!loaded) return (<div>{ Common.load }</div>)
        else {
            return ( 
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-primary btn-sm " to={ "/create" } role="button">{ Common.add } { Common.customer }</Link>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>{ Common.id }</th>
                                    <th>{ Common.full_name }</th>
                                    <th>{ Common.phone }</th>
                                    <th>{ Common.email }</th>
                                    <th>{ Common.age }</th>
                                    <th>{ Common.state }</th>
                                    <th>{ Common.created_at }</th>
                                    <th>{ Common.actions }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map(customer => (
                                        <tr key={ customer.id }>
                                            <td scope="row">{ customer.id }</td>
                                            <td>{ customer.name } {customer.surnames}</td>
                                            <td>{ customer.phone }</td>
                                            <td>{ customer.email }</td>
                                            <td>{ customer.age }</td>
                                            <td>{ states.find(s => s.id == customer.state).name }</td>
                                            <td>{ Moment(customer.created_at).format('DD/MM/YYYY') }</td>
                                            <td>
                                                <div className="btn-group   !spacing" role="group" aria-label="Basic example">
                                                    <Link className="btn btn-warning btn-sm " to={ `/edit/${ customer.id }` } role="button">{ Common.edit }</Link>
                                                    <button onClick={ () => this.delete(customer.id) } className="btn btn-danger btn-sm " role="button">{ Common.delete }</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>                
            )
        }
    }
}
 
export default List;