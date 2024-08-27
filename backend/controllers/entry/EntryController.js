import Entry from "../../models/Entry.js";
// import Service from "../../models/Service.js";
// import User from "../../models/User.js";

export const addNewEntry = async (entryDetails) => {
  const { username, service_id, weight } = entryDetails;
  let amount = 0;

  try {

    const user = await User.findOne({ username }, { payment_mode: 1, _id: 0 });
    // console.log(result1);
    const { payment_mode } = user || {};
    console.log(payment_mode);
    
    const service = await Service.findById(service_id, { price: 1, _id: 0 });
    // console.log(result2)
    const { price } = service || {};
    console.log(price);

    if (!payment_mode || !price) return Promise.reject({ status: 400 });

    payment_mode === "cash" ? amount = weight * price.cash : amount = weight * price.annually;

    const entry = await Entry.create({ user: username, service_id, weight, amount });

    return Promise.resolve({ entry });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}

export const getAllEntries = async () => {

  try {
    const entries = await Entry.find({}, { __v: 0 }).populate("service", {name: 1});

    return Promise.resolve({ entries });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}

export const getUserEntries = async (user) => {

  try {

    const entries = await Entry.find({ user }, { __v: 0 }).populate("service", { name: 1 });

    return Promise.resolve({ entries });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}