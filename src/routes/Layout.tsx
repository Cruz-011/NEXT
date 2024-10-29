import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Agendamento de Serviços</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>Apoio Porto Seguro, empresa brasileira</p>
            </footer>
        </div>
    );
};

export default Layout;
