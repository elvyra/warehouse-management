import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  IHistory,
  currency,
  unit,
  ToastType,
} from "../interfaces/interfaces";
import {
  getItem,
  updateProps,
  updatePrice,
  updateQuantity,
} from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductForm from "../productForm/ProductForm";
import { CreateEditedProduct } from "../productForm/CreateProductFromFormData";
import {
  Col,
  Row,
  Form,
  ListGroup,
  Button,
  CardDeck,
  Card,
} from "react-bootstrap";
import ToastsContext from "../../context/ToastsContext";

interface MatchParams {
  id: string;
}
interface PropsType extends RouteComponentProps<MatchParams> {}

const ProductEdit: React.FC<PropsType> = (props: PropsType) => {
  const [item, setItem] = useState<IProduct | null>(null);
  const { saveToast } = useContext(ToastsContext);

  useEffect(() => {
    let product: IProduct | null | undefined = getItem(props.match.params.id);
    if (!isNullOrUndefined(product)) setItem(product);
  }, [props.match.params.id]);

  const handleChangeActive = () => {};

  const handleChangeProps = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setItem(updateProps(CreateEditedProduct(event)));
    saveToast({
      title: `Product updated successfully`,
      type: ToastType.success,
      text: `Product properties updated`,
    });
  };

  const handleUpdatePrice = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .price as unknown) as HTMLInputElement).dataset.id;
    let price: IHistory = {
      value: Number(event.currentTarget.price.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updatePrice(id, price));
      if (price.value > 0) {
        saveToast({
          title: `Product price updated successfully`,
          type: ToastType.success,
          text: `Current price ${price.value} ${currency}`,
        });
      } else {
        saveToast({
          title: `Product price updated successfully`,
          type: ToastType.warning,
          text: `Current price ${price.value} ${currency}`,
        });
      }
    }
  };

  const handleUpdateQuantity = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .quantity as unknown) as HTMLInputElement).dataset.id;
    let quantity: IHistory = {
      value: Number(event.currentTarget.quantity.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updateQuantity(id, quantity));
      if (quantity.value > 0) {
        saveToast({
          title: `Product quantity updated successfully`,
          type: ToastType.success,
          text: `Current stock: ${quantity.value} ${unit}`,
        });
      } else {
        saveToast({
          title: `Product quantity updated successfully`,
          type: ToastType.warning,
          text: `Current stock: ${quantity.value} ${unit}`,
        });
      }
    }
  };

  return (
    <>
      {isNullOrUndefined(item) ? (
        <p>Product not found</p>
      ) : (
        <CardDeck>
          <Card style={{ flex: "1 1 100%" }} className="mb-4">
            <Card.Body>
              <Card.Title>Product details</Card.Title>
              <Card.Text>
                <Form onSubmit={handleChangeProps}>
                  <Form.Group as={Row}>
                    <Form.Label column md="2">
                      Id
                    </Form.Label>
                    <Col md="10">
                      <Form.Control
                        type="text"
                        name="id"
                        defaultValue={item.id}
                        plaintext
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                  <ProductForm
                    product={item}
                    handleChangeActive={handleChangeActive}
                  />
                  <Form.Row>
                    <Col md="2" />
                    <Col md="10">
                      <Button type="submit" className="mr-2">
                        Save
                      </Button>
                      <NavLink
                        to="/products"
                        className="btn btn-link text-secondary"
                      >
                        Back to list
                      </NavLink>
                    </Col>
                  </Form.Row>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Price</Card.Title>
              <Card.Text>
                <Form onSubmit={handleUpdatePrice}>
                  <Form.Group as={Row} className="w-100">
                    <Form.Label column md="3">
                      Current ({currency})
                    </Form.Label>
                    <Col md="7">
                      <Form.Control
                        placeholder={item.priceHistory[0].value.toString()}
                        type="text"
                        name="price"
                        data-id={item.id}
                      />
                    </Col>
                    <Col md="2">
                      <Button type="submit">Update</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {item.priceHistory.map((c: IHistory) => (
                <ListGroup.Item key={c.date}>
                  Price: {c.value} {currency} (Updated:{" "}
                  {new Date(c.date).toLocaleString()})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Quantity</Card.Title>
              <Card.Text>
                <Form onSubmit={handleUpdateQuantity}>
                  <Form.Group as={Row} className="w-100">
                    <Form.Label column md="3">
                      Current ({unit})
                    </Form.Label>
                    <Col md="7">
                      <Form.Control
                        type="text"
                        name="quantity"
                        data-id={item.id}
                        placeholder={item!.quantityHistory[0].value.toString()}
                      />
                    </Col>
                    <Col md="2">
                      <Button type="submit">Update</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {item.quantityHistory.map((c: IHistory) => (
                <ListGroup.Item key={c.date}>
                  Quantity: {c.value} {unit} (Updated:{" "}
                  {new Date(c.date).toLocaleString()})
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </CardDeck>
      )}
    </>
  );
};

export default ProductEdit;
