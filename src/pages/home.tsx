import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Col,
  Row,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Space,
} from "antd";
import ScreenerItem from "@/models/ScreenerItem";
import { getScreenerItems2 } from "@/services/FetchData";
import StockTable from "./partials/StockTable";
import { NewPosition } from "@/models/Position";

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const style: React.CSSProperties = {
    background: "#ffffff",
  };

  const [PositionForm] = Form.useForm();

  const [stocks, setStocks] = useState<Array<ScreenerItem>>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const [disableOverride, setDisableOverride] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      let items = await getScreenerItems2();
      console.log(items.length);
      setStocks(items);
      setIsFetched(true);
    };

    fetchData();
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const InputEntry = (values: any) => {
    let ticksize = 1;
    if (values.close <= 200) {
      ticksize = 1;
    } else if (values.close <= 500) {
      ticksize = 2;
    } else if (values.close <= 2000) {
      ticksize = 5;
    } else if (values.close <= 5000) {
      ticksize = 10;
    } else {
      ticksize = 25;
    }
    let newPosition = new NewPosition({
      stock: values.name,
      entry: values.close,
      lot: 0,
      ticksize: ticksize,
      atr: values.atr,
    });

    PositionForm.setFieldsValue(newPosition);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key: number = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={16}>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <div style={style}>
              {isFetched ? (
                <StockTable items={stocks} OnEntry={(obj) => InputEntry(obj)} />
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </Col>
          <Col span={8} style={{ display: "none" }}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: "100%", background: style.background }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={PositionForm}
            >
              <Form.Item label="Stock" name="stock">
                <Input />
              </Form.Item>

              <Form.Item label="Entry Price (Rp)" name="entry">
                <InputNumber />
              </Form.Item>

              <Form.Item label="Lot Size" name="lot">
                <InputNumber />
              </Form.Item>

              <Form.Item label="Tick Size (Rp)" name="ticksize">
                <InputNumber readOnly={disableOverride} />
              </Form.Item>

              <Form.Item label="Override Ticksize">
                <Button
                  type="primary"
                  onClick={() => {
                    setDisableOverride(!disableOverride);
                  }}
                >
                  {disableOverride ? "Override" : "Lock"}
                </Button>
              </Form.Item>

              <Form.Item label="ATR (N)" name="atr">
                <InputNumber<string> step="0.01" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomePage;
