import { Table } from "antd";
import qs from "qs";
import axios from "axios";
import url from "./url";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
const columns = [
  {
    title: "الاسم",
    dataIndex: "name",
  },
  {
    title: "الطول",
    dataIndex: "height",
  },
  {
    title: "الوزن",
    dataIndex: "weight",
  },
  {
    title: "الهاتف",
    dataIndex: "phone",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
export const Data = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });
  const fetchData = (params = {}) => {
    setLoading(true);
    axios
      .get(`${url}/data?${qs.stringify(getRandomuserParams(params))}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: res.data.total, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        });
      });
  };
  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);
  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };
  return (
    <div className="data">
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Link to="/">العودة للرئيسية</Link>
    </div>
  );
};
