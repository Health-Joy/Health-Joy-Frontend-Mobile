import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';

const IngredientsScreen = ({route}) => {
  const {responseData} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const toggleModal = ingredient => {
    setSelectedIngredient(ingredient);
    setShowModal(!showModal);
  };

  const getRiskColor = riskLevel => {
    if (riskLevel <= 4) {
      return 'green';
    } else if (riskLevel <= 7) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const getRiskLabel = riskLevel => {
    if (riskLevel <= 4) {
      return 'Safe';
    } else if (riskLevel <= 7) {
      return 'Moderate';
    } else {
      return 'Poor';
    }
  };

  const averageRiskLabel = `${responseData.averageRiskLevel}/10`;
  const averageRiskColor = getRiskColor(responseData.averageRiskLevel);
  const averageRiskTextLabel = getRiskLabel(responseData.averageRiskLevel);

  return (
    <View style={styles.container}>
      <Text style={[styles.averageRisk, styles.averageRiskText]}>
        Average Risk Level:
      </Text>
      <View style={styles.averageRiskContainer}>
        <View style={[styles.riskBox, {backgroundColor: averageRiskColor}]}>
          <Text style={[styles.riskText, styles.averageRiskText]}>
            {averageRiskLabel}
          </Text>
          <Text style={[styles.riskTextLabel, styles.averageRiskText]}>
            {averageRiskTextLabel}
          </Text>
        </View>
      </View>
      {responseData.ing.map((ingredient, index) => (
        <TouchableOpacity key={index} onPress={() => toggleModal(ingredient)}>
          <View style={styles.ingredientContainer}>
            <View
              style={[
                styles.circle,
                {backgroundColor: getRiskColor(ingredient.riskLevel)},
              ]}></View>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => toggleModal(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedIngredient?.name}</Text>
            <Text style={styles.modalDescription}>
              {selectedIngredient?.description}
            </Text>
            <Button title="Close" onPress={() => toggleModal(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 150,
  },
  averageRisk: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  averageRiskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  averageRiskText: {
    fontSize: 25,
    textAlign: 'center',
  },
  riskBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  riskTextLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 15,
  },
  ingredientName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default IngredientsScreen;
