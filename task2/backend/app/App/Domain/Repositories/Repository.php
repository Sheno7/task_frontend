<?php


namespace App\App\Domain\Repositories;


class Repository implements RepositoryInterface
{
    public function getAll() {
        return $this->model->all();
    }
    public function getById($id) {
        return $this->model->findOrFail($id);
    }
    public function create(array $attributes) {
        return $this->model->create($attributes);
    }
    public function update($id, array $attributes) {
        return $this->getById($id)->update($attributes);
    }
    public function delete($id) {
        return $this->getById($id)->delete();
    }
}
