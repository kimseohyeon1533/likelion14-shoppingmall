import styled from "styled-components";
import sortIcon from "../../assets/icons/Icon_2.png";
import vectorIcon from "../../assets/icons/Vector.png"; 
import {useNavigate} from "react-router-dom";
import { getProducts } from "../../utils/productStore.js";
import { useEffect, useState } from "react";
import { getItems } from "../../api/shop";

const MainContainer = styled.div`
    padding: 40px 158px;
    box-sizing: border-box;
`;

const FilterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

const FilterLeft = styled.div`
    display: flex;
    gap: 12px;
`;

const FilterButton = styled.button`
    display: flex;
    padding: 8px 10px 11px 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    aspect-ratio: 58 / 33;
    border-radius: 20px;
    background: #F2F2F2;
    border: none;
    font-size: 13px;
    color: #616161;
    cursor: pointer;

    &:hover {
        background: #e8e8e8;
    }
`;

const VectorIcon = styled.img`
    width: 10px;
    height: 5px;
`;

const SortText = styled.div`
    font-size: 13px;
    color: #616161;
`;

const SortIcon = styled.img`
    width: 10px;
    height: 11px;
`;

const SortDropdown = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    min-width: 140px;
    z-index: 200;
    padding: 8px 0;
`;

const SortOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 13px;
    color: ${({ $active }) => ($active ? "#333333" : "#AFAFAF")};
    font-weight: ${({ $active }) => ($active ? "600" : "400")};
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

const SortRight = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    position: relative;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

const ProductImage = styled.img`
    width: 100%;
    height: 237px;
    object-fit: contain;
    background: #f7f7f7;
`;

const ProductInfo = styled.div`
    padding: 10px 12px 14px;
`;

const ProductName = styled.div`
    font-size: 11px;
    color: #333333
`;;

const ProductPrice = styled.div`
    margin-top: 4px;
    font-size: 11px;
    font-weight: 700;
    color: #000;
`;

const ProductSub = styled.div`
    margin-top: 2px;
    font-size: 11px;
    color: #A7A7A7;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    background: #fff;
    border-radius: 16px;
    padding: 28px 32px;
    min-width: 260px;
    position: relative;
    z-index: 101;
`;

const ModalTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #111;
    margin-bottom: 20px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    line-height: 1;
`;

const OptionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ColorOptionRow = styled.div`
    display: grid;
    grid-template-columns: max-content max-content max-content;
    gap: 10px;
`;

const ColorChip = styled.button`
    padding: 6px 14px;
    border-radius: 20px;
    border: none;
    background: #F2F2F2;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
        background: #e8e8e8;
    }
`;

const OptionChip = styled.button`
    padding: 8px 18px;
    border-radius: 20px;
    border: none;
    background: #F2F2F2;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    text-align: center;

    &:hover {
        background: #e8e8e8;
    }
`;

const filterOptions = {
    성별: ["남성", "여성", "남녀공용"],
    색상: ["red", "pink", "blue", "black", "gray", "denim", "rainbow", "multi", "holographic"],
    사이즈: ["9", "10", "S", "M", "L", "XL"],
    가격대: ["0~30", "31~60", "61~90"],
    종류: ["옷", "신발"],
};

export default function Main() {
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState(null);
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("기본 정렬순");
    const [items, setItems] = useState([]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await getItems("clothes");
                if (!cancelled) setItems(Array.isArray(res) ? res : []);
            } catch {
                if (!cancelled) setItems([]);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const openModal = (filterName) => setActiveFilter(filterName);
    const closeModal = () => setActiveFilter(null);

    const sortOptions = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

    const handleSortSelect = (option) => {
        setSelectedSort(option);
        setSortOpen(false);
    };
       

    
    return (
        <MainContainer onClick={() => setSortOpen(false)}>

            <FilterRow>
                <FilterLeft>
                    <FilterButton onClick={() => openModal("성별")}>
                        성별 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("색상")}>
                        색상 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("사이즈")}>
                        사이즈 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("가격대")}>
                        가격대 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                    <FilterButton onClick={() => openModal("종류")}>
                        종류 <VectorIcon src={vectorIcon} />
                    </FilterButton>
                </FilterLeft>

                <SortRight onClick={(e) => { e.stopPropagation(); setSortOpen((prev) => !prev); }}>
                    <SortText>{selectedSort}</SortText>
                    <SortIcon src={sortIcon} />
                    {sortOpen && (
                        <SortDropdown onClick={(e) => e.stopPropagation()}>
                            {sortOptions.map((option) => (
                                <SortOption
                                    key={option}
                                    $active={option === selectedSort}
                                    onClick={() => handleSortSelect(option)}
                                >
                                    {option}
                                    {option === selectedSort && <span>✓</span>}
                                </SortOption>
                            ))}
                        </SortDropdown>
                    )}
                </SortRight>
            </FilterRow>

 
        <ProductGrid>
    {items.map((item) => (
        <ProductCard key={item.id} onClick={() => navigate(`/item/${item.id}`)}>
            <ProductImage src={item.image} alt={item.name} />

            <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductPrice>{item.price}</ProductPrice>
                <ProductSub>리뷰 {item.review}</ProductSub>
            </ProductInfo>
        </ProductCard>
    ))}
</ProductGrid>

            {activeFilter && (
    <Overlay onClick={closeModal}>
        <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{activeFilter}</ModalTitle>
            <CloseButton onClick={closeModal}>✕</CloseButton>
            {activeFilter === "색상" ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div style={{ display: "flex", gap: "8px" }}>
            <ColorChip>red</ColorChip>
            <ColorChip>pink</ColorChip>
            <ColorChip>blue</ColorChip>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
            <ColorChip>black</ColorChip>
            <ColorChip>gray</ColorChip>
            <ColorChip>denim</ColorChip>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
            <ColorChip>rainbow</ColorChip>
            <ColorChip>multi</ColorChip>
            <ColorChip>holographic</ColorChip>
        </div>
    </div>
            ) : activeFilter === "사이즈" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <OptionChip>9</OptionChip>
                        <OptionChip>10</OptionChip>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <OptionChip>S</OptionChip>
                        <OptionChip>M</OptionChip>
                        <OptionChip>L</OptionChip>
                        <OptionChip>XL</OptionChip>
                    </div>
                </div>
            ) : (
                <OptionRow>
                    {filterOptions[activeFilter].map((option) => (
                        <OptionChip key={option}>{option}</OptionChip>
                    ))}
                </OptionRow>
            )}
        </Modal>
    </Overlay>
)}

        </MainContainer>
    );
}