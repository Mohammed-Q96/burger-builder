import React, { Component } from 'react';
import withErrorHandler from 'HOC/withErrorHandler';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Order from 'components/Order/Order';

class Orders extends Component {
  state = {
    data: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const { data, status } = await axios.get('orders.json');
    try {
      if (status === 200) {
        const cache = [];
        // eslint-disable-next-line array-callback-return
        Object.keys(data).map(orderID => {
          cache.push({ id: orderID, ...data[orderID] });
        });

        this.setState({ data: cache, loading: false });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, data } = this.state;
    let orders = data.map(({ id, ingredinets, price }) => (
      <Order key={id} price={price} ingredinets={ingredinets} />
    ));
    if (loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
