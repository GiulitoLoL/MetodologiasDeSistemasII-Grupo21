import './../stylesheets/productCard.css'

interface Props {
    name:string;
    tipo:string;
    cantidad:number;
}

const ProductCard = ({ name, tipo, cantidad }: Props) => {
    const isOutOfStock = cantidad === 0;
    const cardClassName = `ProductCard ${isOutOfStock ? 'out-of-stock' : ''}`;


    return <div className={cardClassName}>
        <h1 className="productcard__name">{name}</h1>
        <h2 className="productcard__tipo">{tipo}</h2>
        <h2 className="productcard__cantidad">
            {isOutOfStock ? 'AGOTADO' : cantidad}
        </h2>
    </div>
};

export default ProductCard;