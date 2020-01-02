import Sequelize, { Model } from 'sequelize';
import SequelizePaginate from 'sequelize-paginate';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
SequelizePaginate.paginate(Plans);
export default Plans;
