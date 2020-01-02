import Plans from '../models/Plans';

class PlansController {
  // INDEX
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, paginate = 10 } = req.query;

    const options = {
      page,
      paginate,
      order: [['duration', 'ASC']],
    };

    const data = id ? await Plans.findByPk(id) : await Plans.paginate(options);

    if (data.length === 0) {
      return res.status(400).json({ error: 'Não há Planos cadastrados!' });
    }

    return res.json(data);
  }

  // STORE
  async store(req, res) {
    const planExists = await Plans.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Este plano já existe!' });
    }

    const { title, duration, price } = await Plans.create(req.body);

    return res.json({ title, duration, price });
  }

  // UPDATE
  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const plan = await Plans.findByPk(id);

    if (!plan) {
      return res.status(404).json({ error: 'Plano não encontrado!' });
    }

    const { duration, price } = await plan.update(req.body);

    return res.json({ id, title, duration, price });
  }

  // DELETE
  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plans.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado!' });
    }

    await plan.destroy();

    return res.status(200).json({ message: 'Plano excluído com sucesso!' });
  }
}

export default new PlansController();
