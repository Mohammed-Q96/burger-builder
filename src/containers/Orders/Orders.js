import React from 'react';
import { connect } from 'react-redux';
import { getOrederThunk } from 'actions';
import useIsMounted from 'hooks/useIsMounted';
import withErrorHandler from 'HOC/withErrorHandler';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Order from 'components/Order/Order';

export const Orders = props => {
  const [loading, setlLoading] = React.useState(false);
  const ismountd = useIsMounted();
  const { data, fetchOrder } = props;
  React.useEffect(() => {
    setlLoading(true);
    (async () => {
      await fetchOrder();
      if (ismountd.current) {
        setlLoading(false);
      }
    })();
    // eslint-disable-next-line 
  }, [fetchOrder]);
  let orders = React.useMemo(
    () =>
      data.map(({ id, ingredients = {}, price }) => {
        return <Order key={id} price={price} ingredinets={ingredients} />;
      }),
    [data],
  );
  if (loading) {
    orders = <Spinner />;
  }
  return <div>{orders}</div>;
};

const mapStateToProps = ({ order }) => {
  return { data: order };
};

const mapDispatchToProps = {
  fetchOrder: getOrederThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
