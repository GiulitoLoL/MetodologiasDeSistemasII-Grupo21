import './../stylesheets/productCard.css'

interface Props {
    name:string;
    tipo:string;
    cantidad:number;
}

const ProductCard = ({ name, tipo, cantidad }: Props) => {
    return <div className="ProductCard">
        <h1 className="productcard__name">{name}</h1>
        <h2 className="productcard__tipo">{tipo}</h2>
        <h2 className="productcard__cantidad">{cantidad}</h2>
    </div>
};

export default ProductCard;