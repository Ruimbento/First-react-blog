import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <div className="advertisement">
        {/*Adblock блочит класс advertisement-container*/}
        <div className="container advertisement-container-noAdb">
          <h4>Хотите получать уведомление о новых постах?</h4>
          <p>
            Тогда подпишитесь на нашу рассылку и узнавайте первыми о какой-то
            там фигне
          </p>
          <InputGroup className="mb-3">
            <FormControl placeholder="Введите свой email" aria-label="Email" />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  alert("Это же прототип, на что ты подписываться собрался?")
                }
              >
                Подписаться
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
