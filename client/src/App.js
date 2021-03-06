import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" component={HomeScreen} exact></Route>
					<Route path="/page/:pageNumber" component={HomeScreen} exact></Route>
					<Route
						path="/search/:keyword/page/:pageNumber"
						component={HomeScreen}
						exact
					></Route>
					<Route path="/search/:keyword" component={HomeScreen} exact></Route>
					<Route path="/order/:id" component={OrderScreen} exact></Route>
					<Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
					<Route path="/payment" component={PaymentScreen} exact></Route>
					<Route path="/shipping" component={ShippingScreen} exact></Route>
					<Route path="/profile" component={ProfileScreen} exact></Route>
					<Route path="/register" component={RegisterScreen} exact></Route>
					<Route path="/login" component={LoginScreen} exact></Route>
					<Route
						path="/admin/orderlist"
						component={OrderListScreen}
						exact
					></Route>
					<Route
						path="/admin/productlist"
						component={ProductListScreen}
						exact
					></Route>
					<Route
						path="/admin/productlist/:pageNumber"
						component={ProductListScreen}
						exact
					></Route>
					<Route
						path="/admin/products/:id/edit"
						component={ProductEditScreen}
						exact
					></Route>
					<Route
						path="/admin/userlist"
						component={UserListScreen}
						exact
					></Route>
					<Route
						path="/admin/user/:id/edit"
						component={UserEditScreen}
						exact
					></Route>
					<Route path="/product/:id" component={ProductScreen} exact></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
