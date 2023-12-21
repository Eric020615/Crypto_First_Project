interface INavbarItems {
    title: string; 
    classProps?: string;
}

const NavbarItem = ( { title, classProps } : INavbarItems) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

export default NavbarItem;