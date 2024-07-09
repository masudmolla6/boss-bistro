import { useState } from "react";
import orderImg from "../../assets/shop/banner2.jpg"
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../../components/FoodCard/FoodCard";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories = ['Desserts','Pizza','Salad','Soup','Drinks'];

    const [tabIntex, setTabIndex] = useState(0);
    const { category } = useParams();
    // console.log(category);
    const [menu] = useMenu();
        const desserts = menu.filter((item) => item.category === "dessert");
        const soup = menu.filter((item) => item.category === "soup");
        const pizza = menu.filter((item) => item.category === "pizza");
        const salad = menu.filter((item) => item.category === "salad");
        const drinks = menu.filter((item) => item.category === "drinks");
    return (
      <div>
        <Helmet>
          <title>Bistro Boss || Order Food</title>
      </Helmet>
        <Cover img={orderImg} title={"Our Shop"}></Cover>
        <Tabs defaultIndex={tabIntex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Desserts</Tab>
            <Tab>Pizza</Tab>
            <Tab>Salad</Tab>
            <Tab>Soup</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={desserts}></OrderTab>
          </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
          </TabPanel>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
          </TabPanel>
            <TabPanel>
                    <OrderTab items={soup}></OrderTab>
          </TabPanel>
            <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    );
};

export default Order;