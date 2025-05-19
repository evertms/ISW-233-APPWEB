export const observerMixin = {
    observers: new Set(), // Dentro del set tenemos punteros a funciones, es un set de funciones
    addObserver(observer) {
        this.observers.add(observer);
    },
    removeObserver(observer) {
        this.observers.delete(observer);
    },
    notifyObservers() {
        // Separar por funcionalidad
        this.observers.forEach(observer => observer());
    }
}