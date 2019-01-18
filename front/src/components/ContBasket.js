import React, { Component } from "react";
import MainHeader from "./MainHeader";
import "react-times/css/classic/default.css";
import { RootContainer } from "../styled/Index";
import BasketProductsList from "./BasketComponents/BasketProductsList";
import imageBasket from "../assets/img/thumbShoppingCart.jpg";
import axios from "axios";
import config from "../assets/lib/axiosConfig";
import timeToRangeWithInterval from "../assets/js/timeToRange";
import FooterPrice from "./BasketComponents/FooterPrice";
import { Button, Grid, Typography, Snackbar, Fade } from "@material-ui/core";
import { Alarm } from "@material-ui/icons";
import "react-times/css/material/default.css";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import moment from "moment";
import "moment/locale/fr";
import Emitter from "../emitter";
import {
	StyledDatePicker,
	StyledTimeContainer
} from "../styled/StyledTimePicker";

const lunchTime = (today, delay, bool) => {
	console.log("t", today);
	if (today) {
		return timeToRangeWithInterval(
			today.lunch_start_time,
			today.lunch_end_time,
			15
		).reduce((ac, el) => ac.concat(el), []);
	}
	return [];
};
const dinnerTime = today => {
	if (today) {
		return timeToRangeWithInterval(
			today.dinner_start_time,
			today.dinner_end_time,
			15
		).reduce((ac, el) => ac.concat(el), []);
	}
	return [];
};

class ContBasket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			delay: 0,
			snack: false,
			today: {},
			timeOpen: false,
			products: [],
			selectedDate: "",
			timing: [],
			exceptTiming: [],
			maxDate: moment().add(1, "month"),
			message: null
		};
		this.restoreCart = this.restoreCart.bind(this);
		this.action = this.action.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.disableDays = this.disableDays.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.emitter = Emitter;
		this.checkTimeMessage = this.checkTimeMessage.bind(this);
	}

	restoreCart() {
		const tab = JSON.parse(localStorage.getItem("cart"));
		if (tab) {
			this.setState({
				products: tab
			});
		}
	}

	action(id, action) {
		const cart = [...this.state.products];
		const index = cart.findIndex(elt => elt.id === id);
		if (action === "up") {
			cart[index].quantity = cart[index].quantity + 1;
		} else if (action === "down") {
			cart[index].quantity = cart[index].quantity - 1;
			if (cart[index].quantity === 0) {
				cart.splice(index, 1);
			}
		} else {
			cart.splice(index, 1);
		}
		this.setState(
			{
				products: cart
			},
			() => {
				const str = JSON.stringify(cart);
				localStorage.setItem("cart", str);
				this.emitter.emit("refreshCart"); // Listener prints "5 10".
			}
		);
	}

	handleTimeChange(el) {
		this.setState({
			time: el,
			timeOpen: !this.state.timeOpen
		});
		localStorage.setItem("dateTime", el);
	}

	componentDidMount() {
		const time = moment();
		const days = [6, 0, 1, 2, 3, 4, 5];
		axios(config({}, "/timing", "get")).then(res => {
			const { timing, exceptTiming, delay } = res.data;
			const newTiming = days.map((el, i) => {
				const thisTime = timing[el];
				if (thisTime.shift_lunch && thisTime.shift_dinner) {
					return thisTime;
				}
				if (thisTime.shift_lunch) {
					const { dinner_start_time, dinner_end_time, ...myTime } = thisTime;
					return myTime;
				}
				if (thisTime.shift_dinner) {
					const { lunch_start_time, lunch_end_time, ...myTime } = thisTime;
					return myTime;
				}
				return null;
			});
			const now = moment();
			const after = time.add(1, "month");
			const tabOfOpenDay = [];
			while (now.isAfter(after) === false) {
				const matchDate = exceptTiming.map(el =>
					now.isBetween(
						moment(el.start_day, ["LL"])
							.subtract(1, "days")
							.format(),
						moment(el.end_day, ["LL"])
							.add(1, "days")
							.format()
					)
				);
				if (!matchDate.includes(true)) {
					tabOfOpenDay.push(now.format());
				}
				now.add(1, "days");
			}
			const thisDateTime = moment();
			const selectedDate =
				tabOfOpenDay.length > 0 ? tabOfOpenDay[0] : thisDateTime.format();
			const day = moment(selectedDate)._d.getDay();
			const today = newTiming[day];
			this.setState({
				delay: delay.time,
				today,
				timing: newTiming,
				exceptTiming,
				selectedDate: tabOfOpenDay.length > 0 ? tabOfOpenDay[0] : selectedDate
			});
			localStorage.setItem("dateOrder", selectedDate);
		});
		this.restoreCart();
	}

	handleDateChange(date) {
		const { timing } = this.state;
		const today = timing[date._d.getDay()];
		const newDate = date.format();
		localStorage.setItem("dateOrder", newDate);
		this.setState({ selectedDate: newDate, today });
	}

	disableDays(date) {
		const { exceptTiming, timing } = this.state;
		const matchDate = exceptTiming.map(el =>
			date.isBetween(
				moment(el.start_day, ["LL"])
					.subtract(1, "days")
					.format(),
				moment(el.end_day, ["LL"])
					.add(1, "days")
					.format()
			)
		);
		const thisDate = date._d.getDay();
		if (timing[thisDate] === null || matchDate.includes(true)) {
			return true;
		} else {
			return false;
		}
	}

	checkTimeMessage() {
		const { time } = this.state;
		if (time) {
			return true;
		}
		this.setState({ message: "Veuillez selectionner une heure de retrait" });
	}

	render() {
		const {
			selectedDate,
			timeOpen,
			today,
			time,
			maxDate,
			products,
			delay
		} = this.state;
		console.log("delay", delay);
		const { shift_lunch, shift_dinner } = today;
		const { history } = this.props;
		const now = moment();
		const bool = now.isSame(selectedDate, "days");
		const delivery = bool ? now.add(delay, "minutes") : now;

		const lunch = lunchTime(today).filter(
			el => console.log(moment(el, ["LT"]), delivery.format("LT"))
			//    moment(el, ["LT"]).isAfter(delivery, ["LT"])
		);
		const dinner = dinnerTime(today).filter(el =>
			moment(el, ["LT"]).isAfter(delivery, ["LT"])
		);
		return (
			<RootContainer
				justify="space-between"
				onClick={e => {
					this.setState({ timeOpen: false });
				}}
			>
				<MainHeader
					{...this.props}
					pageTitle="Panier"
					redirect={() => history.goBack()}
					displayDateTime={
						products.length > 0 ? (
							<MuiPickersUtilsProvider
								utils={MomentUtils}
								moment={moment}
								locale="fr"
							>
								<StyledDatePicker>
									A retirer :
									<DatePicker
										ref={el => (this.input = el)}
										className="selectDate"
										value={selectedDate}
										ampm="false"
										disablePast={true}
										onChange={this.handleDateChange}
										format="Do MMM"
										maxDate={maxDate.format("YYYY-MM-DD")}
										shouldDisableDate={this.disableDays}
										onOpen={() => this.setState({ timeOpen: false })}
										style={{
											width: "60px",
											color: "#fff",
											padding: "0 5px",
											margin: "0",
											border: "0px #fff"
										}}
									/>
									{lunch.length || dinner.length ? (
										<span style={{ display: "flex" }}>
											{time ? time : "Heure"}
											<Alarm
												style={{
													marginLeft: "5px",
													color: "rgb(0,158,224)",
													cursor: "pointer"
												}}
												onClick={e => {
													e.stopPropagation();
													this.input.setState({ open: false });
													this.setState({ timeOpen: !this.state.timeOpen });
												}}
											/>
										</span>
									) : null}
								</StyledDatePicker>
							</MuiPickersUtilsProvider>
						) : null
					}
					titleAvatars="basket"
					image={imageBasket}
				/>
				<BasketProductsList
					action={this.action}
					products={this.state.products}
				/>
				{this.state.products.length > 0 && (
					<FooterPrice
						products={this.state.products}
						checkMessage={this.checkTimeMessage}
						time={time}
						{...this.props}
					/>
				)}
				<StyledTimeContainer timeOpen={timeOpen}>
					{shift_lunch && (
						<div>
							<Grid container justify="center">
								<Typography
									variant="title"
									style={{ color: "#fff", margin: "0.6rem auto" }}
								>
									Midi
								</Typography>
							</Grid>
							<Grid container justify="center" spacing={8}>
								{lunch.length &&
									lunch.map((el, i) => (
										<Grid item key={el + i}>
											<Button
												variant="contained"
												onClick={() => this.handleTimeChange(el)}
											>
												{el}
											</Button>
										</Grid>
									))}
								{!lunch.length && (
									<Typography
										variant="body1"
										style={{ color: "#fff", margin: "0.6rem auto" }}
									>
										Service Fermé
									</Typography>
								)}
							</Grid>
						</div>
					)}
					{shift_dinner && (
						<div>
							<Grid container justify="center">
								<Typography
									variant="title"
									style={{ color: "#fff", margin: "0.6rem auto" }}
								>
									Soir
								</Typography>
							</Grid>
							<Grid container justify="center" spacing={8}>
								{dinner.map((el, i) => (
									<Grid item key={el + i}>
										<Button
											variant="contained"
											onClick={() => this.handleTimeChange(el)}
										>
											{el}
										</Button>
									</Grid>
								))}
							</Grid>
						</div>
					)}
				</StyledTimeContainer>
				<Snackbar
					open={this.state.message !== null ? true : false}
					autoHideDuration={3000}
					onClose={() => this.setState({ message: null })}
					TransitionComponent={Fade}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">{this.state.message}</span>}
				/>
			</RootContainer>
		);
	}
}

export default ContBasket;

// if(!time && bool){
//

//   if (moment(delivery, ['LT']).isBetween(moment(today.lunch_start_time,['LT']),moment(today.lunch_end_time,['LT']))){
//     if(lunch.length > 0){
//       time = lunch[0]
//     }
//   }
//   if (moment(delivery, ['LT']).isBetween(moment(today.dinner_start_time, ['LT']), moment(today.dinner_end_time, ['LT']))) {
//     if(dinner.length > 0){
//       time = dinner[0]
//     }
//   }
//   if (moment(delivery, ['LT']).isBetween(moment("00:00", ['LT']), moment(today.lunch_start_time, ['LT']))){
//     if (lunch.length > 0) {
//       time = lunch[0]
//     }
//   }
//   if (moment(delivery, ['LT']).isBetween(moment(today.lunch_end_time, ['LT']), moment(today.dinner_start_time, ['LT']))) {
//     if (dinner.length > 0) {
//       time = dinner[0]
//     }
//   }
// }
