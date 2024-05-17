import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Image } from 'react-native';
import Navbar from '../Components/Navbar';
import userData from '../Global/GlobalVariable';
import AddFavoriteApi from '../Api/Favorite/AddFavoriteApi';
import RemoveFavoriteApi from '../Api/Favorite/RemoveFavoriteApi';
//IngredientsDetail screen
const IngredientsScreen = ({ route }) => {
  const { responseData, productId, productName, flag} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartIconSource, setHeartIconSource] = useState(require('../assets/favorite-icons/heart_empty.png'));
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const toggleModal = ingredient => {
    setSelectedIngredient(ingredient);
    setShowModal(!showModal);
  };

  const userFavoriteProductCheck = () => {
    if(userData.userFavorites.includes(productId))  {//eğer bu kullanıcının favori ürünüyse
      setHeartIconSource(require('../assets/favorite-icons/heart.png')); // Dolu kalp ikonunu kullan
      setIsFavorite(true);
    } else {
      setHeartIconSource(require('../assets/favorite-icons/heart_empty.png')); // Boş kalp ikonunu kullan
      setIsFavorite(false);
    }
  }

  useEffect(() => {
    userFavoriteProductCheck();
    console.log(flag);
  }, []);

  const handleFavoriteButton = () => {
    
    if (!isFavorite) {
      userData.userFavorites.push(productId); // Ekleme işlemi
      AddFavoriteApi(productId, userData.userId);
      setHeartIconSource(require('../assets/favorite-icons/heart.png')); // Dolu kalp ikonunu kullan
      setIsFavorite(true);
    } else {
      const index = userData.userFavorites.indexOf(productId);
      if (index > -1) {
        userData.userFavorites.splice(index, 1); // Kaldırma işlemi
      }
      RemoveFavoriteApi(productId, userData.userId);
      setHeartIconSource(require('../assets/favorite-icons/heart_empty.png')); // Boş kalp ikonunu kullan
      setIsFavorite(false);
    }
  };

  const getRiskColor = riskLevel => {
    if (riskLevel <= 4) {
      return 'rgba(0, 132, 80, 1)'; // Yeşil, tam opak
    } else if (riskLevel <= 7) {
      return 'rgba(255, 200, 58, 0.85)'; // Sarı, 0.85 opaklık
    } else {
      return 'rgba(184, 29, 19, 1)'; // Kırmızı, tam opak
    }
  };


  const getRiskLabel = riskLevel => {
    if (riskLevel <= 4) {
      return 'Safe';
    } else if (riskLevel <= 7) {
      return 'Fair';//makul, uygun(medium yazılır belki)
    } else {
      return 'Poor';
    }
  };


  const averageRiskLabel = `${responseData.averageRiskLevel}/10`;
  const averageRiskColor = getRiskColor(responseData.averageRiskLevel);
  const averageRiskTextLabel = getRiskLabel(responseData.averageRiskLevel);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.productNameContainer}>
        <Text style={styles.productName}>{productName}</Text>
      </View>
      {flag === false && (
        <TouchableOpacity style={styles.heartButton} onPress={handleFavoriteButton}>
          <Image
            source={heartIconSource}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      )}
      <View style={styles.averageRiskContainer}>
        <View style={[styles.riskBox, { backgroundColor: averageRiskColor }]}>
          <Text style={[styles.riskText, styles.averageRiskText]}>
            {averageRiskLabel}
          </Text>
          <Text style={[styles.riskTextLabel, styles.averageRiskText]}>
            {averageRiskTextLabel}
          </Text>
        </View>
      </View>
      <View style={styles.IngredientsText}>
        <Text style={styles.Ingredients}>Ingredients</Text>
      </View>
      {responseData.ing.map((ingredient, index) => (
        <TouchableOpacity key={index} onPress={() => toggleModal(ingredient)}>
          <View style={styles.ingredientContainer}>
            <View
              style={[
                styles.circle,
                { backgroundColor: getRiskColor(ingredient.riskLevel) },
              ]}
            />
            <View style={styles.ingredientInfo}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.riskLevel}>{ingredient.riskLevel}</Text>
            </View>
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
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  averageRiskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  averageRiskText: {
    fontSize: 18,
    textAlign: 'center',
  },
  riskBox: {
    width: 145,
    height: 59,
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
  IngredientsText: {
    marginTop: 20,
  },
  Ingredients: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  circle: {
    width: 31,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 15,
  },
  ingredientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  ingredientName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  riskLevel: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F3EAE8',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
  },
  heartButton: {
    position: 'absolute',
    top: -100,
    right: 24, 
  },
  heartIcon: {
    width: 40,
    height: 40,
  },
  productNameContainer: {
    alignItems: 'center',
    top: -30,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default IngredientsScreen;
