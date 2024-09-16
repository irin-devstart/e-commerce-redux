import Typography from "components/atoms/Typography";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { incremented, decremented } from "./redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchProduct } from "./redux/products/productSlice";

const App = () => {
  const value = useSelector((state: { value: number }) => state.value);
  const { product } = useAppSelector((state: any) => state.product);
  console.log(product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h6" size="bold">
        Test Text
      </Typography>
      <button onClick={() => dispatch(incremented())}>incremented</button>
      <h1>{value}</h1>
      <button onClick={() => dispatch(decremented())}>decremented</button>

      <div>
        {product.map((value: any) => (
          <h1>{value.id}</h1>
        ))}
      </div>
    </div>
  );
};

export default App;
