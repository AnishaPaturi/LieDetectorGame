import logging

def setup_logger(name: str, level: int = logging.INFO, log_to_file: bool = False) -> logging.Logger:
    logger = logging.getLogger(name)
    if not logger.hasHandlers():
        logger.setLevel(level)

        formatter = logging.Formatter("[%(asctime)s] %(levelname)s in %(name)s: %(message)s")

        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)

        if log_to_file:
            file_handler = logging.FileHandler("logs/app.log")
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)

        logger.propagate = False

    return logger
