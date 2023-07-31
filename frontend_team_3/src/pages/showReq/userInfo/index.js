
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
import { NavLink, useParams } from 'react-router-dom'
import { Localhost } from '../../../config/api'

const Info = () => {
    const [data, setData] = useState([])
    const [datainfo, setDataInfo] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const getReq = async () => {
            try {
                const response = await axios.get(`${Localhost}/api/req/request/${id}`, {
                    withCredentials: true,
                });
                setData([response.data[0].profile]);
                setDataInfo([response.data[0].owner]);
            } catch (error) {
                console.log(error);
            }
        };
        getReq();
    }, [id]);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="mb-2 userinfo px-5 pt-5 box-info">
            {data.map((item) => (
                <>

                    <h3 className=" text-capitalize fw-bold blue-color title-info">
                        About {item.name}
                    </h3>
                    <div className="bg-white p-4 radius d-flex box-info-container">
                        <div className="w-100">
                            {/*  */}
                            <div className="d-flex flex-wrap w-100 mt-1 text-capitalize box-info-left ">
                                {/* info1  d-flex flex-column */}
                                <div className="">
                                    {
                                        datainfo.map((item) => (
                                            <>
                                                <p className="  d-flex flex-column">
                                                    <span className="data1 ">Name</span>
                                                    <span>{item.name}</span>
                                                </p>
                                                <p className="  d-flex flex-column">
                                                    <span className="data1 ">email</span>
                                                    <span>{item.email}</span>
                                                </p>
                                            </>
                                        ))
                                    }
                                </div>
                                {/* my-2 d-flex flex-column */}
                                <div className="middleBox ">
                                    <p className=" d-flex flex-column">
                                        <span className="data1 ">location</span>
                                        <span>{item.location}</span>
                                    </p>
                                    <p className="d-flex flex-column">
                                        <span className="data1 ">my Specialization </span>
                                        <span>{item.designation}</span>
                                    </p>
                                </div>
                            </div>

                            {/* <div className="mt-5 w-100">
                                <p className="w-60"> make a type specimen book. specimen book. specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            </div> */}


                        </div> 
                        {/* user avatar */}
                        {/* d-flex flex-column flex-md-row box-last */}
                        <div className="box-info-right">
                            <div className="info1 d-flex flex-column listExperince">
                                <ul className=" d-flex flex-column">
                                    <span className="data1 mb-4"> experise </span>
                                    {item.expertise.map((i) =>
                                        <li>{i}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="d-flex flex-column align-items-center  userAvatar">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAAC0CAMAAACXO6ihAAAAw1BMVEX/q6vK4/8AAAD+q6v/r6//rq7/sbEQCQmocHDJ5P+UYmI5JSXT7f/un5+GWVn/qKZMMjLglpbO5/+ha2vnmpr0o6NwSkqxdnYmKzFCKytePz/TjY2Wqb7JhoacaGi91O+/gIBYOjp7UlIoGhrO3/nyusLV2O8nGRnDgoJHLy/kydl/VFTvvccfFBRnREQwHx/4s7jmx9bZ1OnfzuEXDQ3wu8Q+TlmtwtoVGh7atsLFy+KOoLSBkaOftMthbnxWYG2ElKe/PsXOAAAXC0lEQVR4nO1dCXcjuY2mhSKttkZHWZIrtiK37N5Ju+O4ncl0MkkmM7v//1dt8QZ41KUzmeD1s1QsFAF+BQIkSKoZAwDGGDD5l8krdS0v7ae+C2DKdIljZ+aLKneXpkZUi5Fin3N8VmrAziw7eClIqFXCqZfS0QllSaGxjk5oQBBfRDyIwd1rYkpX3iy0gVJCG9rRLr4TEzGdgBcIrOiRdGX05aS+pFTL1J4Tup+OkVBvMkEtGRsJ2xhW3IUdEgUNteTvnkLH0IIitCH9F9cas+uvEdyBbO8v2oV2ZU+wYFcT3syoTnTEDwK+B4HosM7EZaYBRK/oscjPdBKa1DEmUgt6hOiYEWrvginyT9p3oQuBVgb+X/AuItcOjp0Fd51Qr1BKqLsP/m/QWKc4+pPREbCOTikqNMC5xVPF5b3YM3ea3vWphSaFOYgZ83/tCMWhqcspu7s078YPQXK1QCS0nT0nlAVCmavFKOUqN+bZQ8cknNGNZpQz7B1fTW/2RqGZm8N1BOQKIFVs35YtNgCTYuKuEuxBsTUFY3JYKGSEsoRQaBbawI59Z0ZowjfhcoZMzjK6XpFiR16vgT0jFLP3EgpdhHbTscGUMrf2tfhTsB9X6H/JUAv6uc+O7B1r6cnej22gjuGtxFAn+USmuDXAJTFpExoonWGHSMdGDNqFukBvLsFGAnBZD+uDvRN34wEAXIv1Y9bNobDkfHnIzrwU60hjoSwUSiKP0zYUSnVkTTo6L97og/9L2ArR62MeY29LGXZ8Mwh52Dp71NKBPdSRtdbuzCbochmhSZyiIoi+Yh261tKTPSE0xx4U76NjV2ZdHvk1x55Dtwf7WYTm4EoLbX/wuHRpQn2ntBNQ2hNtICH+wxu6jyTMBgjj7hE3YiddHtzELGDPCXWTbCw0rWN/oSwl9PJe2AHY96eUq96bPQ5KEXuuloxfOIyOfYQ23xr2WsOnsr69WzFkyltq309oVIom7aTb4rk87YcD2an8JDvxBafSETI6puptLe5Zy4GEnlDHPj25G/seNZ5FaMTe8nxLN8+xdWTfr7aBQjPsyWI0UrB3wH4Lpk6mHM2LMTsw0oERuxtIUKEQCXXsPsr44pi9XUeIdcwLBYbk4irBtYc85dvsGRhzOWhXB2bHAoDUEghFvEmhsY4OkYgd1+I+ckKpjkQoc7cctJgbvyV7i0fk6rS5DszOmC9nhNxLahAaGJhLJaH2pXSkQrFcN/4NQCE6ertjmCvAEJmp0qFcjitM4+WWk+ZGNSJbdpmoUGigJnqBjp20j1ylhBJIo9RIJBQioa4SCL6RK4zUutyOMC3LKeowgVJxnQlqFxrpSMt7CB2kIzH2wAAxjFzMEDAPgkdG5q7DGmPhkLvokIWIhSZsKy00p2NKKClLTaz9V3GDkJmJwPoy+Ca/9hAaNqIDO6FeQiN3TT4Sb8ZUWjwiZG6KuAMkhIW3E+zNQqMqDyO0iT1WpY2KMUZG9HgyoD5C+7PvT/kekGHvggz2dO39q1WB3joeQmjzrVQxRaZIsIdP5eR2FJrqYx1q309oVNphhh8g08YeeIm0SfxnZCE6+5ljvswjW1CeqemBBDIdtOygQk+WwwuN2FueD7t5xmZCto61dhTaAkNPoRn2ZDGYHoaCOhoCkBk+D/0MYf8tZyECm2nNQtjZuRUYjzBBztcdL4RCGatLCzmpdzo6RPTj6hKwEF2rvt4nC8EsXgE3fkvuViZq4yyE148Lvi531XhcbVZQcKSBeYYXBV9vSgUNiOmu2q4L965VYVFA+VKNq12pKiBZCM5FAdOXdV1arHZVtZ0akOvH6rqqlxUvqCuJsxDgyuPUR4JiDod6CplUhSBxKW/u5YR88zIZja6/7pgL8vKVClFMt8u799HoUVZTrO9UnY9+jAQ1WMunumyxkXOSh8pmg/TjrNzNnq5Ho5IXqwet0P1OSBHF9Ku+fl8CZ1lKYtDirPLUPWqLzUIxVYIXcK2+LplNdNWmdPNkq1nWYAiX3vjqKi3Wz6pkUuOgxH7emHvrTfV6bx8oxYtX6al+8cXGX0/WDdA0EURf/FUSvSQyCXbgNl0hNbO5i/ey0JxPqBaJjNj5yx3XVbmyrZy4mntSIqyu8eOrDb56KniJryfYOWcASDeXujPqTkNnGSFTsAw7gLHn0Rdp37yyj2z0I3yLGrcs8FsefdFv2eU7PsmaxZ15nkv3BHjGXxKcRi/wiVyPC6QjcbfNLU1f500pbzPkYWGBGb0KaUC+5SsdZAR6sUsxJW1Zy9cslvZyJtAb+abfL04TPT2tio1H52H8tilWC3f9ntMx39JBvqabnxFjyoMM/N3IFROPTPH++RlVKzOoCMudtCF3rU0A95gHwZmo/PWkjm8Fur/q6Wnmf/6foyEDa8+jYg0go1jqh4R/q+PZAjNcqyD6TlvmoJhoo1l5fhn0ObreqHzam7t+6YfM/E9XH9BoRn8m2siCPphCBkJ2bOtjHkD1bQ0BMk9fGC9cqBnd1S0rkA3o0YeDrlRABchgAeqaex8/LqK2NXSX+Y8frq40KsR3OyTwSBP8AgfEHpiwm4e+jbBeQBSXsUeO6zwyozXHnkh2JuGBqh2yUtJeVwrqCBnvaKSTZuLBXS8LP3xGQ1zXJDyUnYs/1MBcxebRTm29SQ19caTRbwwjowcsCJlHWeBitOoMqOEPJprZ61fluBqQUUZVEGS6tnT+/ZUEhiDT1TV3yUIQnhiZNx4go1SvB/Sz97fJzVT1BTS8uTN+yTb9aW9ksq2e//BBAXOVfaAfMhGJ50ZkRsrRhMjIUCxJOyHkqJ6FmpI6ZO7TfiZARnRCJqC/aFwMMuEcMvgM/0Rzbc/uPJXAI9yxnCxRZErlCEJksHCM7ddSkYPic8LPAPUzLLYZomOypXWwtsBcIXb14TwU4GIGaNNDmIUINgroarBzTdmMUp0gY3MLWhxzI15Ji6WmsSWlY6/eFG9m8C21yMz/9MEBc4XxIyNkoiXti9m1AyVrpSoKkanbHSEDid7khWJknkVBSHmpJpvJ9yYwrz/RUvajx+UIfkY8aedKexOLexNL+Rlc0bPnvks5swP7GROsj4cMX/CwXSlkpmkPjKUgD/z1+MjMv/9AgJHI5KeOmeDdlIUAeCsinq5Rm7h6jjIuX9zgHinUP2pnhiJqePdHiguNTZYP8Dc67E8gQ7MQ9dxGT/foSC+MTXX3gJSfQULxNGpE906ZpHHbGDgxnslkIebwhxAY3JsCRPOm1JSFELORDpBAZwcMgtmBYs56YOXEv3r+kiMpvFSjof69KdEp1BccrI/lZ2TzdRvJjDLsTd/0RK3RzxCze8RSxMN0GDIZcsPeYyJTh9rrwmHk2hVmIR6jLERqKI16wzvu1etFKmqz1pFejv6SwEUi46ad+jN+kHihXG/SDDJbdW22GvmEnPZF6BV/sjg2I8MRlmPhdBR3esskyccEyEgOQMg8ZrMQc5HoSdZmemchwj1XhoerG9e2oMDZTsCdo9SrRoDyDM+CoTGp8cIFCk92yaCekH/VvDinp5BBQL5ID8y/uOuZcGN51zClg8xRJYEZlIUg+/Tcy+ZipUZ31z7K2NHeQk2NXSJqax+Bz66ap6S54wTmjhccoODjiX0RyA9VBUVKd1dvQ0+hSVqL+TGDy7AsBNnbqZABLnj5rAuufRiHV8NUoKf0qopqGl76WPOUAgLtsL0fl+vpbrKwq0ciGAqi7jtaFGH1qQbNizhY7+OBRTFBIh9l2mC6nfkytMAoNtqgd4Jzk+R7tCtxda/EM4hnkR5VrtH0SVmH5StWuHgrCrL4ICXiqdtzwo/Nv8+4GI8MmYLGn/QP1KpeOxrd3y10n7AlbwVi56J8lXnuqtyo1duKuaQFgzdUT11RKNz4ArGaucWjpwpsOqEeIl/jxx83I1LdbP2NXC84mmxrYH5owGVYFgKY/+qW5sHdYQzP8LmA9aZaPj5WLysQ3KDLXEVuoZ1sqSBCBVvpLQProrBTZWa3nDCrh9+DArgFDO8TIU1KB+uwN4HXl/kip2UU7+g2f4Mi3cKCGOQWj4LzqLu4jQdOBIXG83GZeuBAdSQvwyPuigGxMaywjEmpYe++fuY/gfLB+reOTD5YY2S8dZKHIS5iMcNe7E21ZKo6hNAwR9VgM9hjky5JXAz5lmhZhj1XC0kItAsF2ENH8qBdUOremwLsm95qE3uGK8OeFwoprp46BqTKW4J1CpnfBrUF60Mh409R/ntQe7BGyJiBhA3+cW3ECxH2gm92u5UavkGGPUPdrD8pNO5DkNYxUQtZUOpgM32zEDYnKyo1mX1accIOVlnHjrW3VQJlR/c9ux/RDtAxJbRDsM70ptaXh8mnaUraoxodYOfiHA1m7xask8hA5nua0CR/0qUVHXDZg72dZf7XTsE6YzN9CK+1bS/fDc//2N3FeGRQn0x9hn9M30VZGnX8C3V4/Md/ohcIrUIJe4uOsVAW1JJaUGpDhurYKQth5KItt3JTKmV3tRA8UBo2FhrshYiFgqtFVxLCi9MjCKxOM+uMzaBYQl+S1TLRdYH79LY9KAAN7Khp6FZuWwIErBl2htgbhKYXlLohM4BwGnZz2X6m67D3QMigpbbkVoVLoSE9ySDjzDB2ealyR25V48s6beNNtfQU2sqeoaYFpS42A7SPBv4f6A2vU7GSgftt6c55BbECnaKCuM2xUGgUCjE+gB9M6QiJ3R+dkYnCn40LifcTREsAwVdrUYA9xoc8qD21p4/5oWCKQwfX6V1u44zP2II5NYiFcZ9Jtpib6ayTYXiVUIVL04JSF5sZTMALeaxtgzywzGYLPpXH/4CLdflSySN7TIQ+mgtYbarlclxty3UhDHg1VHL9iq2n5abSe0F0EfgSi2pduNpJjqKsZWymVgQX6tjgqig65qgOjYw6rLfeLu8mZk+30lYeanz8+i53hnBWubWwz68rstIGhVqHutmULzf185PnF2Uv5a5azu6eJp/8dGy7G988P9y/q8mr2h2ioIeymi3e5NqjKI2UxVadRBSlWeCbVEOCdYxMqzMLCFYvNw/2MIk6fgTqUKM9HzIWm+vJA9peNGPebPha7QaYyg3QhW6a3AfCNzO8/Kk2BlR4jVIiA+vN+Nmt5QNe+r6rLQ+frPvbcFwCm4kOnnrXAIEPLciiqkKGf8ZF1cv7qu4FSM/3KbdeZK3wsxvzuahn7W9SeG2GaM1c7abmuIop0G1uoxHb4as7UZCfmvrb7b7IIP+fMB4/fkV+ttj400fGZvgLOrP3PFJHXgVqyGfrJsyWWL8DrR41vunXghteaq+K1qvVebA13nCwGo2QXY7KNb3+/XBoCAK9xg14hX1m9lDh91npHUbYCB40GzfvdeG3+In7b9oqwy1mITJSR7yH+uFuBchMXmf3JZT+ne1hNIkmdyW0Dc4gwzh6X8ZAyBbNnbISl7+o3Ni5BsvYTAsyGFlJz7UzRvOUt0U9XsAnlD8eEpl0l3K3PDL+1TlkvANdmOk32U3+ST/oTvFVLpjDJ3WmtBsyaGOM8k7IVGXmdf69v/5p7/GMG8ShqTzzA1kDF1k7a0bG/WYa2dX3Ip1w4a8fSmGGcTuzdSJEBlqRAbyVsbbU+Q+3f3fXwx1NwhbaCdI2AxgZ9wsGJJioAwQC+8gb89sEdsNvT5tRUzbMIWfWt787GDKDqNlm/OFx7GhUBMJboOsetsVjwL69KUJGzqz/XZBh+Ly9Oj6MBmeS7tY+i7EvMv+4rR3L4ZBBk0VMQP8x+jdCBiJktFvieFyrcul4572iysXvVmQgQoZ4oo/S457AZgK8gHy22oxFEO8k3CkXTAauuIIBNgOEQ0XpwyAzPAtBkIEkMqquGBl6+knRjTBTkP42cyxkhlNHP0OPx+lDKsCJE5Zklqz29TOn6k2HQQbbjAEACjz5kWTOXFwgMn2zEAORcTkusaU/EWN+1GJvZK6OYjM9shAJZOLYZOBCC1O6bRoDjnbDj+wpUoqMkhz4GTiVByYG0yML0TYGTo9nJuo8T2UqmGJv86brCJCJbQaieRM7up/pl4Xo0pvClmlGMVmZUEa6lI6HwaGlVBYi6E3zP//z2Mj0pGZkHpMnUszRfnf4D/+mOYQ4bjv5mflfP3w8ETKHyUK82iwE/oEdfYqpDuN+sclBc617E3hu/ctG+PhXjMxc7v44KjL7ZSHuUvkZw44zcPqXFmtkrGOS8kz6+KvQwzg/+pkAh3omjiYXCZuRC0oNyPx8jiwEOqb4EHvgkYPUF5nzc3LotxVu8mAycuanqHA656kEtvny7n+uSv+QF85rfKxbjm3mJ4nErb/+1zn8DIrG77HN2DEd6kyvhksNikvragzDwp3Ipj+NVw+b0VcRVDn6pW757S/+WtuIv/71u9Mjg0/G2l9lw8joo4scXEOX7oyoGvrZtIy2mc/uFySDZZPRDB1vvl8VQX5Htvy7X/31/9bXt7/3138/fRYCAK84PXAIRnoqycsLZlvxUBb2ef6o0Hpdy4U4ocL0w5q7msUWJyle6U8Q3q+A/Fhj3X1uf8LXv9zefvwduv7XUKNptouGLATepjeya0kImZub0fO2rPQCx+Sx9AvbtQtev7zKgczdrizlQPh5g9N6UKwfLTaL2rK0zVwvZstdWQ9oyO821/Tzz/T6/z7S618HWs3gLIT+RSpPOmqgkZ4Qq221XC6r7QZEwb3BqcFa/UBZ3765qbalEOaMo4uLhZA3q61cxa8HdtWmlOL0qTi5kFl///E7Q7e33xG6vQqvj2EzfSnIz/hdIAlSG0jU7WRN6p7pfVEVPTc9XxwyR6O9dn/0RqZ/FiJBfZEZNI4atlVzODJKcq8shPE7eBKaRibN7moPPRr2R4mAOe98QukQyAzKQkSs6SxEiE8KsEahlH3oVs2ByDjZfbIQCfZUFqKxDnqnQ+cavFVzL2T2p6N74Ibf/jgBMl2zEAn2aCWuczWdhJ4iWEfI9M9CuAEh2tlLkMGHI2wtkc9G5ZAVaoHpeULpEMgMi55xMUKm/bf9+o4Tuh4nPigyhyK0YL3P/x+XogEnlC4IGZyqPPApjZMFa4rMkCwE+nTFeIOq/HkmOlCLa0nNWllS6GmGvTEyWQpUz4zwLPEV3hH8NXa0jU83Cj1dsPbIQKhMjxMZhtF8h9Wne0STJxSLSLRjaaFAQ5d/DdmfvDsuMgck9ctCwc8bH4D6HMy/UGSOQ8NPKB0Imb6jizQdZmCEaM5PHKxjZJSieELtv3bOQiD2VPspOxn/xuya8yQ5qiZkcNCJ32P3LETAnrqbBCwn9AzBOkDGqRgMUbKt6sjeLVhnamEDjxMfAZkLo9MPe9uQSVu3u7Une6Y8ruVMwTpCxg2/9spC+BG9r8XzsT5ZiBPmqJqQOUywPWDIPmmOqgmZS6MzBuvLRubEOaoGZFIJAVxMEgKJ4Qxk2SGqLmanLDXxcwZrR80vL1A9M8JreLqplgydOVg7SicEEmN2/I4BRVmfhaCtBhvYemYhzh2sHXV7+yekcwdrR+cGgtIFBGtHTqmeg5EM7TekuYRg7YgqCoG63jWcIgtxrhxVmiLdE6/9RFmIs+Wo0hSoCqHamVZ1ZO8WrNWdSwnWjrLqnpjOmaNKU0LJdGdwt/ZkT5fPL2LYSwgpawZu4bjMj+iPloW4uJ4kqfnldn7ne9Vyun1UfahfY45ClxWsHZ0blosa9hJS2qUSArg4zh+QzzCtgNghqi5gb/4/lM5JzS80kz/o6FDI2DculnR5wdpROiHATpSFOOuCUgt1e/vHoYsM1o7OCcxFBmtHTs+TZyHOvqDUQrRdp8tCXGywdhTpnsofHD4LcVE5qjQFup8oC3HBwdpRqslHpz1+6fl09P9A6UWhQ+1VKgAAAABJRU5ErkJggg=="
                                    //    src={item.avatar}
                                    alt="avatar"
                                    width="80"
                                    height="80"
                                    className="rounded-circle shadow-1-strong mb-3"
                                />
                                <NavLink
                                    to="/external"
                                    className="profileBtn px-4 py-2 rounded-pill "
                                    style={{
                                        backgroundColor: "darkgray",
                                        color: "#000000d6",
                                        fontWeight: "500",
                                    }}
                                >
                                    view profile
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </>
            )
            )}
        </div>
    )
}

export default Info
