const reporteConsulta = async (req, res, next) => {
    const { method, url } = req;
    const reporte = `\n${new Date()} \n Recibida una consulta [${method}] en ruta [${url}]`;  
    console.log(reporte);
    next();
};

module.exports = reporteConsulta;