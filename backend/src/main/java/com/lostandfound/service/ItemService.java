package com.lostandfound.service;

import com.lostandfound.dto.ItemDTO;
import com.lostandfound.model.Item;
import com.lostandfound.model.ItemStatus;
import com.lostandfound.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    // Get all items
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get item by ID
    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        return convertToDTO(item);
    }

    // Get items by status
    public List<ItemDTO> getItemsByStatus(String status) {
        ItemStatus itemStatus = ItemStatus.fromValue(status);
        return itemRepository.findByStatus(itemStatus).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get items by user email
    public List<ItemDTO> getUserItems(String email) {
        return itemRepository.findByContactEmail(email).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get items by category
    public List<ItemDTO> getItemsByCategory(String category) {
        return itemRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Create new item
    public ItemDTO createItem(ItemDTO itemDTO) {
        Item item = convertToEntity(itemDTO);
        item.setDateReported(LocalDate.now());
        Item savedItem = itemRepository.save(item);
        return convertToDTO(savedItem);
    }

    // Update item
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        
        item.setTitle(itemDTO.getTitle());
        item.setDescription(itemDTO.getDescription());
        item.setCategory(itemDTO.getCategory());
        item.setLocation(itemDTO.getLocation());
        item.setDateLost(itemDTO.getDateLost());
        item.setImageUrl(itemDTO.getImageUrl());
        item.setContactName(itemDTO.getContactName());
        item.setContactEmail(itemDTO.getContactEmail());
        item.setContactPhone(itemDTO.getContactPhone());
        
        Item updatedItem = itemRepository.save(item);
        return convertToDTO(updatedItem);
    }

    // Update item status
    public ItemDTO updateItemStatus(Long id, String status) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        
        item.setStatus(ItemStatus.fromValue(status));
        Item updatedItem = itemRepository.save(item);
        return convertToDTO(updatedItem);
    }

    // Delete item
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    // Helper method to convert Entity to DTO
    private ItemDTO convertToDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setTitle(item.getTitle());
        dto.setDescription(item.getDescription());
        dto.setCategory(item.getCategory());
        dto.setLocation(item.getLocation());
        dto.setDateLost(item.getDateLost());
        dto.setStatus(item.getStatus().getValue());
        dto.setDateReported(item.getDateReported());
        dto.setImageUrl(item.getImageUrl());
        dto.setContactName(item.getContactName());
        dto.setContactEmail(item.getContactEmail());
        dto.setContactPhone(item.getContactPhone());
        return dto;
    }

    // Helper method to convert DTO to Entity
    private Item convertToEntity(ItemDTO dto) {
        Item item = new Item();
        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setCategory(dto.getCategory());
        item.setLocation(dto.getLocation());
        item.setDateLost(dto.getDateLost());
        item.setStatus(ItemStatus.fromValue(dto.getStatus()));
        item.setImageUrl(dto.getImageUrl());
        item.setContactName(dto.getContactName());
        item.setContactEmail(dto.getContactEmail());
        item.setContactPhone(dto.getContactPhone());
        return item;
    }
}
