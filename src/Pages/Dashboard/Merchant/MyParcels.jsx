import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("myParcels");
      return res.data;
    },
  });
  // console.log(parcels);
  return (
    <div className="md:-mt-16 w-full">
      <SectionTitle title="My Parcels"></SectionTitle>
      <div className="overflow-x-auto mx-auto mr-1 ml-1">
        <table className="table table-xs md:table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer's Name</th>
              <th>Parcel Type</th>
              <th>Customer's Number</th>
              <th>Delivery Address</th>
              <th>Delivery man's Id</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Review</th>
              <th>Update</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              return (
                <tr style={{ fontSize: 14 }} key={parcel._id}>
                  <td className="text-lg">{index + 1}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.receiverNumber}</td>
                  <td>{parcel.receiverAddress}</td>
                  <td>Assign Later</td>
                  <td>{parcel.date}</td>
                  <td
                    className={
                      parcel.status === "pending"
                        ? "text-red-600"
                        : "bg-green-300 rounded"
                    }
                  >
                    {parcel.status}
                  </td>
                  <td>
                    <button
                      className={`btn btn-xs btn-primary ${
                        parcel.status === "delivered"
                          ? "enabled"
                          : "btn-disabled"
                      }`}
                    >
                      <MdRateReview className="text-white text-lg"></MdRateReview>
                    </button>

                    {/* <button className="btn btn-">
                      <MdRateReview></MdRateReview>
                    </button> */}
                  </td>
                  <td>
                    <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                      <button
                        title="Update Menu"
                        className="text-2xl p-1 text-black px-3 hover:bg-orange-300"
                      >
                        <FaRegEdit></FaRegEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-xs btn-accent">Pay</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
